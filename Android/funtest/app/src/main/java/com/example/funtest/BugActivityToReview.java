package com.example.funtest;

import static com.example.funtest.MainActivity.bugList;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.ProgressDialog;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.Volley;
import com.example.funtest.objects.Bug;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class BugActivityToReview extends AppCompatActivity {

    RecyclerView recyclerView;
    BugAdapterToReview bugAdapter;
    public static ArrayList<Bug> bugListToReview;

    private ProgressDialog pDialog;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bug_to_review);


        //setup of recycler view with bug list adapter
        recyclerView = findViewById(R.id.bl_recyclerView);

    }

    private void getBugListToReview() {
        BugActivityToReview.bugListToReview = new ArrayList<>();

        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        if(!token.equalsIgnoreCase("") ) {
            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Errors/toRetest";

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

                            BugActivityToReview.bugListToReview.add(currentBug);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }

                    recyclerView.setHasFixedSize(true);

                    if(bugListToReview.size() > 0 ){
                        bugAdapter = new BugAdapterToReview(getApplicationContext(),bugListToReview);
                        recyclerView.setAdapter(bugAdapter);
                        recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext(),RecyclerView.VERTICAL,false));
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
    }

    @Override
    protected void onResume() {
        super.onResume();

        //get bug list again
        getBugListToReview();

    }
}