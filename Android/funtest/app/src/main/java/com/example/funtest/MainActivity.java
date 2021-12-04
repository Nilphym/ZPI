package com.example.funtest;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.Manifest;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Base64;
import android.util.Log;
import android.view.MenuItem;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.funtest.fragments.BugsFragment;
import com.example.funtest.fragments.DashboardFragment;
import com.example.funtest.fragments.TestsFragment;
import com.example.funtest.objects.Bug;
import com.example.funtest.objects.TestPlan;
import com.google.android.material.navigation.NavigationView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener, DashboardFragment.onDashboardFragmentButtonSelected, BugsFragment.onBugsFragmentButtonSelected {

    //Navigation Drawer
    DrawerLayout drawerLayout;
    ActionBarDrawerToggle actionBarDrawerToggle;
    Toolbar toolbar;
    NavigationView navigationView;

    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;

    Boolean isFirstRun;

    //Permissions
    private static final int REQUEST_CODE = 1;

    //item lists
    public static ArrayList<Bug> bugList;
    public static ArrayList<TestPlan> testPlanList;

    private ProgressDialog pDialog;
    private ProgressDialog pDialog2;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        isFirstRun=true;

        toolbar = findViewById(R.id.ndt_toolbar);
        setSupportActionBar(toolbar);

        drawerLayout = findViewById(R.id.navigation_drawer);
        navigationView = findViewById(R.id.am_navigation_view);
        navigationView.setNavigationItemSelectedListener(this);

        actionBarDrawerToggle = new ActionBarDrawerToggle(this,drawerLayout,toolbar,R.string.OpenNavigationDrawer,R.string.CloseNavigationDrawer);
        drawerLayout.addDrawerListener(actionBarDrawerToggle);
        actionBarDrawerToggle.setDrawerIndicatorEnabled(true);
        actionBarDrawerToggle.syncState();

        /*
        //begin transaction and load default fragment
        fragmentManager = getSupportFragmentManager();
        fragmentTransaction = fragmentManager.beginTransaction();

        fragmentTransaction.add(R.id.mc_frame_layout, new DashboardFragment());
        fragmentTransaction.commit();

         */

        //check necessary permissons
        checkPermissions();

        //set username in nav drawer
        View headerLayout = navigationView.getHeaderView(0);
        TextView textView_username = headerLayout.findViewById(R.id.ndh_user_name);

        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        if(!token.equalsIgnoreCase(""))
        {
            String[] split_token = token.split("\\.");
            try {
                String string_body = getJson(split_token[1]);
                JSONObject json_body = new JSONObject(string_body);
                String name = json_body.getString("name");
                String surname = json_body.getString("surname");
                textView_username.setText(name + " " + surname);

                //set shared preferences
                SharedPreferences.Editor editor = preferences.edit();
                editor.putString("userId",json_body.getString("userId"));
                editor.putString("productId",json_body.getString("productId"));
                editor.putString("role",json_body.getString("role"));
                editor.apply();

            } catch (UnsupportedEncodingException | JSONException e) {
                e.printStackTrace();
            }
        }

        //DASHBOARD get user stats / If PM: get project stats



    }

    @Override
    protected void onResume() {
        super.onResume();
        //TESTS get public data
        getTestPlanList();

        //BUGS get public data
        getBugList();
    }

    private void getTestPlanList() {
        MainActivity.testPlanList = new ArrayList<>();

        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        String productId = preferences.getString("productId", "");
        if(!token.equalsIgnoreCase("") && !productId.equalsIgnoreCase("")) {
            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Product/"+productId+"/TestPlans";

            RequestQueue requestQueue = Volley.newRequestQueue(this);
            //JSONObject jsonBody = new JSONObject();
            //jsonBody.put("token", token);

            JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
                @Override
                public void onResponse(JSONArray response) {
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
                    }

                    for(int i=0;i<response.length();i++){
                        try {
                            JSONObject currentObject = response.getJSONObject(i);
                            TestPlan currentTestPlan = new TestPlan();
                            currentTestPlan.setId(currentObject.getString("id"));
                            currentTestPlan.setName(currentObject.getString("name"));
                            MainActivity.testPlanList.add(currentTestPlan);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }

                }
            }, new Response.ErrorListener(){
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("LOG_RESPONSE", error.toString());
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
                    }

                }
            }){
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    Map<String, String> params = new HashMap<String, String>();
                    params.put("Authorization", "Bearer "+ token);
                    return params;
                }
            };


            requestQueue.add(jsonArrayRequest);
        }
        /*
        MainActivity.testPlanList.add(new TestPlan("1","Test Plan 1", new ArrayList<>()));
        MainActivity.testPlanList.add(new TestPlan("2","Test Plan 2", new ArrayList<>()));
        MainActivity.testPlanList.add(new TestPlan("3","Test Plan 3", new ArrayList<>()));
        MainActivity.testPlanList.add(new TestPlan("4","Test Plan 4", new ArrayList<>()));
        MainActivity.testPlanList.add(new TestPlan("5","Test Plan 5", new ArrayList<>()));

         */

    }

    //fetching public bug list from API
    private void getBugList() {
        MainActivity.bugList = new ArrayList<>();

        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        String productId = preferences.getString("productId", "");
        if(!token.equalsIgnoreCase("") && !productId.equalsIgnoreCase("")) {
            pDialog2 = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog2.setMessage("Loading...");
            pDialog2.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Project/"+productId+"/Errors";

            RequestQueue requestQueue = Volley.newRequestQueue(this);
            //JSONObject jsonBody = new JSONObject();
            //jsonBody.put("token", token);

            JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(Request.Method.GET, url, null, new Response.Listener<JSONArray>() {
                @Override
                public void onResponse(JSONArray response) {
                    if (pDialog2 != null) {
                        pDialog2.dismiss();
                        pDialog2 = null;
                    }

                    for(int i=0;i<response.length();i++){
                        try {
                            JSONObject currentObject = response.getJSONObject(i);
                            Bug currentBug = new Bug();

                            currentBug.setId(currentObject.getString("id"));
                            currentBug.setDeadline(currentObject.getString("deadline"));
                            currentBug.setDescription(currentObject.getString("description"));
                            currentBug.setEndDate(currentObject.getString("endDate"));
                            currentBug.setImpact(currentObject.getString("errorImpact"));
                            currentBug.setName(currentObject.getString("name"));
                            currentBug.setCode(currentObject.getString("code"));
                            currentBug.setPriority(currentObject.getString("errorPriority"));
                            currentBug.setReportDate(currentObject.getString("reportDate"));
                            currentBug.setState(currentObject.getString("errorState"));
                            currentBug.setType(currentObject.getString("errorType"));
                            currentBug.setFunctionality(currentObject.getString("functionality"));
                            currentBug.setRetestsRequired(currentObject.getInt("retestsRequired"));
                            currentBug.setRetestsDone(currentObject.getInt("retestsDone"));
                            currentBug.setRetestsFailed(currentObject.getInt("retestsFailed"));

                            MainActivity.bugList.add(currentBug);


                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                    if(isFirstRun){
                        //begin transaction and load default fragment
                        fragmentManager = getSupportFragmentManager();
                        fragmentTransaction = fragmentManager.beginTransaction();

                        fragmentTransaction.add(R.id.mc_frame_layout, new DashboardFragment());
                        fragmentTransaction.commit();
                    }
                    isFirstRun = false;

                }
            }, new Response.ErrorListener(){
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("LOG_RESPONSE", error.toString());
                    if (pDialog2 != null) {
                        pDialog2.dismiss();
                        pDialog2 = null;
                    }

                }
            }){
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    Map<String, String> params = new HashMap<String, String>();
                    params.put("Authorization", "Bearer "+ token);
                    return params;
                }
            };


            requestQueue.add(jsonArrayRequest);
        }



        /*
        //CURRENTLY ADDING STATIC DATA
        MainActivity.bugList = new ArrayList<>();


        ArrayList<String> attachments1 = new ArrayList<>();
        ArrayList<String> attachments2 = new ArrayList<>();
        ArrayList<String> attachments3 = new ArrayList<>();
        ArrayList<String> attachments4 = new ArrayList<>();
        ArrayList<String> attachments5 = new ArrayList<>();

        MainActivity.bugList.add(new Bug("E-12323","Not responding","New","Login","Functional","High","High",1,1,1,"12/15/2022","12/20/2022","12/05/2022","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sed risus vel iaculis. Phasellus imperdiet velit a rhoncus dignissim. Vivamus blandit fringilla ligula, et eleifend nisl imperdiet cursus. Nullam non lobortis risus. Integer sollicitudin mattis neque, eget imperdiet mauris maximus vitae. Praesent fringilla, nisl eget dictum maximus, sapien odio sodales magna, et finibus dolor massa in turpis. Donec enim felis, suscipit malesuada libero vitae, lacinia efficitur enim.", attachments1));
        MainActivity.bugList.add(new Bug("E-12324","Table not visible","New","Register","Functional","Medium","Low",1,1,1,"12/15/2022","12/20/2022","12/05/2022","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sed risus vel iaculis. Phasellus imperdiet velit a rhoncus dignissim. Vivamus blandit fringilla ligula, et eleifend nisl imperdiet cursus. Nullam non lobortis risus. Integer sollicitudin mattis neque, eget imperdiet mauris maximus vitae. Praesent fringilla, nisl eget dictum maximus, sapien odio sodales magna, et finibus dolor massa in turpis. Donec enim felis, suscipit malesuada libero vitae, lacinia efficitur enim.",attachments2));
        MainActivity.bugList.add(new Bug("E-12325","Button not respondingAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA","New","Add to basket","Functional","High","Medium",1,1,1,"12/15/2022","12/20/2022","12/05/2022","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sed risus vel iaculis. Phasellus imperdiet velit a rhoncus dignissim. Vivamus blandit fringilla ligula, et eleifend nisl imperdiet cursus. Nullam non lobortis risus. Integer sollicitudin mattis neque, eget imperdiet mauris maximus vitae. Praesent fringilla, nisl eget dictum maximus, sapien odio sodales magna, et finibus dolor massa in turpis. Donec enim felis, suscipit malesuada libero vitae, lacinia efficitur enim.",attachments3));
        MainActivity.bugList.add(new Bug("E-12326","Screen Freezes","New","Refresh page","Functional","Low","Low",1,1,1,"12/15/2022","12/20/2022","12/05/2022","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sed risus vel iaculis. Phasellus imperdiet velit a rhoncus dignissim. Vivamus blandit fringilla ligula, et eleifend nisl imperdiet cursus. Nullam non lobortis risus. Integer sollicitudin mattis neque, eget imperdiet mauris maximus vitae. Praesent fringilla, nisl eget dictum maximus, sapien odio sodales magna, et finibus dolor massa in turpis. Donec enim felis, suscipit malesuada libero vitae, lacinia efficitur enim.",attachments4));
        MainActivity.bugList.add(new Bug("E-12327","Screen not responding","New","Refresh page","Functional","Low","Low",1,1,1,"12/15/2022","12/20/2022","12/05/2022","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sed risus vel iaculis. Phasellus imperdiet velit a rhoncus dignissim. Vivamus blandit fringilla ligula, et eleifend nisl imperdiet cursus. Nullam non lobortis risus. Integer sollicitudin mattis neque, eget imperdiet mauris maximus vitae. Praesent fringilla, nisl eget dictum maximus, sapien odio sodales magna, et finibus dolor massa in turpis. Donec enim felis, suscipit malesuada libero vitae, lacinia efficitur enim.",attachments5));
        //

         */
    }


    //PERMISSIONS LOGIC
    private void checkPermissions() {
        if(ContextCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.WRITE_EXTERNAL_STORAGE)!= PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(MainActivity.this,new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},REQUEST_CODE);
        }

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(requestCode == REQUEST_CODE){
            if(grantResults[0] != PackageManager.PERMISSION_GRANTED){
                ActivityCompat.requestPermissions(MainActivity.this,new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},REQUEST_CODE);

            }

        }
    }

    //NAVIGATION DRAWER LOGIC
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {

        drawerLayout.closeDrawer(GravityCompat.START);

        if(item.getItemId() == R.id.menu_item_dashboard){
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            fragmentTransaction.replace(R.id.mc_frame_layout, new DashboardFragment());
            fragmentTransaction.commit();

        }
        else if(item.getItemId() == R.id.menu_item_tests){
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            fragmentTransaction.replace(R.id.mc_frame_layout, new TestsFragment());
            fragmentTransaction.commit();

        }
        else if(item.getItemId() == R.id.menu_item_bugs){
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            fragmentTransaction.replace(R.id.mc_frame_layout, new BugsFragment());
            fragmentTransaction.commit();

        }
        else if(item.getItemId() == R.id.menu_item_logout){
            finish();

        }
        return true;
    }
    //DASHBOARD FRAGMENT ACTIONS REACTIONS
    @Override
    public void onDasboardButtonSelected() {
        Toast.makeText(getApplicationContext(), "PM Reports Button", Toast.LENGTH_SHORT).show();

    }

    //BUGS FRAGMENT ACTIONS REACTIONS
    @Override
    public void onButtonSelectedMyBugs() {
        Intent intent = new Intent(getApplicationContext(), BugActivityMyBugs.class);
        //intent.putExtra("sourceActivityName","BugDetailsActivity");
        startActivity(intent);
    }

    @Override
    public void onButtonSelectedToFix() {
        Intent intent = new Intent(getApplicationContext(), BugActivityToFix.class);
        //intent.putExtra("sourceActivityName","BugDetailsActivity");
        startActivity(intent);
    }

    @Override
    public void onButtonSelectedToReview() {
        Intent intent = new Intent(getApplicationContext(), BugActivityToReview.class);
        //intent.putExtra("sourceActivityName","BugDetailsActivity");
        startActivity(intent);
    }
    ////////////////////////////
    private static String getJson(String strEncoded) throws UnsupportedEncodingException {
        byte[] decodedBytes = Base64.decode(strEncoded, Base64.URL_SAFE);
        return new String(decodedBytes, "UTF-8");
    }

    @Override
    public void onBackPressed() {

    }
}