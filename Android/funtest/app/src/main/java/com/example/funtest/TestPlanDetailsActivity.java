package com.example.funtest;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.ExpandableListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.funtest.objects.Test;
import com.example.funtest.objects.TestPlan;
import com.example.funtest.objects.TestSuite;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class TestPlanDetailsActivity extends AppCompatActivity {

    TextView textView_name;
    ExpandableListView expandableListView_tests;
    TestSuiteAdapterExpandableListView testSuiteAdapterExpandableListView;

    public static ArrayList<TestPlan> currentTestPlanList = MainActivity.testPlanList;
    ArrayList<TestSuite>currentTestSuiteList;
    int testPlan_list_position = -1;
    String testPlan_id = "";

    private ProgressDialog pDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_plan_details);

        initializeViews();
        get_position();
        getTestPlansData();

        //setting textviews in layout with current bug details
        textView_name.setText(currentTestPlanList.get(testPlan_list_position).getName());

        //setting expandable list adapter
        //testSuiteAdapterExpandableListView = new TestSuiteAdapterExpandableListView(this,currentTestPlanList.get(testPlan_list_position).getTestSuites());

    }

    private void getTestPlansData() {
        TestPlan currentTestPLan = currentTestPlanList.get(testPlan_list_position);

        currentTestSuiteList = new ArrayList<>();

        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        if(!token.equalsIgnoreCase("")) {
            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/TestPlans/maciej/" + testPlan_id;

            RequestQueue requestQueue = Volley.newRequestQueue(this);
            //JSONObject jsonBody = new JSONObject();
            //jsonBody.put("token", token);

            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET,url,null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Log.i("LOG_RESPONSE", response.toString());
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
                    }

                    try {
                        JSONArray testSuites = response.getJSONArray("testSuites");
                        Log.i("LOG_RESPONSE", testSuites.toString());

                        for(int i=0;i<testSuites.length();i++) {
                            JSONObject jsonTestSuite = testSuites.getJSONObject(i);

                            TestSuite currentTestSuite = new TestSuite();
                            currentTestSuite.setId(jsonTestSuite.getString("id"));
                            currentTestSuite.setCategory(jsonTestSuite.getString("category"));

                            JSONArray jsonTests = jsonTestSuite.getJSONArray("testsForTestSuite");

                            ArrayList<Test> currentTestList = new ArrayList<>();
                            for(int j=0; j<jsonTests.length();j++){
                                JSONObject jsonTest = (JSONObject) jsonTests.get(j);
                                Test currentTest = new Test();
                                currentTest.setName(jsonTest.getString("name"));
                                currentTest.setId(jsonTest.getString("id"));

                                currentTestList.add(currentTest);
                            }
                            currentTestSuite.setTests(currentTestList);
                            currentTestSuiteList.add(currentTestSuite);

                        }
                        currentTestPLan.setTestSuites(currentTestSuiteList);
                        //MainActivity.testPlanList.get(testPlan_list_position).setTestSuites(currentTestSuiteList);

                        testSuiteAdapterExpandableListView = new TestSuiteAdapterExpandableListView(getApplicationContext(),currentTestSuiteList);
                        expandableListView_tests.setAdapter(testSuiteAdapterExpandableListView);
                        expandableListView_tests.setOnChildClickListener(new ExpandableListView.OnChildClickListener() {
                            @Override
                            public boolean onChildClick(ExpandableListView expandableListView, View view, int i, int i1, long l) {
                                Intent intent = new Intent(getApplicationContext(), TestDetailsActivity.class);
                                //intent.putExtra("id",currentTestPlanList.get(testPlan_list_position).getTestSuites().get(i).getTests().get(i1).getId());
                                intent.putExtra("id",currentTestSuiteList.get(i).getTests().get(i1).getId());
                                startActivity(intent);

                                return false;
                            }
                        });


                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                }
            }, new Response.ErrorListener() {
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

            requestQueue.add(jsonObjectRequest);
        }

    }

    private void get_position() {

        testPlan_list_position = getIntent().getIntExtra("position",-1);
        testPlan_id = getIntent().getStringExtra("id");

    }

    private void initializeViews() {
        textView_name = findViewById(R.id.tpd_textView_name);
        textView_name.setSelected(true);

        expandableListView_tests = findViewById(R.id.tpd_expandableListView);




    }
}