package com.example.funtest;

import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.funtest.objects.Test;
import com.example.funtest.objects.TestCase;
import com.example.funtest.objects.TestProcedure;
import com.example.funtest.objects.TestSuite;
import com.example.funtest.utils.ListViewUtils;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class TestDetailsActivity extends AppCompatActivity {

    TextView textView_name, textView_creationDate, textView_testcasecode, textView_testprocedurecode, textView_preconditions, textView_result;
    ListView listView_entryData;
    FloatingActionButton fab_performTest;

    private Test currentTest;
    private String currentTestId;

    private ProgressDialog pDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_details);

        initializeViews();
        get_position();
        getTestData();



    }

    private void continueInit() throws JSONException {
        //setting textviews in layout with current test details
        textView_name.setText(currentTest.getName());
        textView_creationDate.setText(currentTest.getCreationDate());

        textView_testcasecode.setText(currentTest.getTestCase().getCode());
        textView_preconditions.setText(currentTest.getTestCase().getPreconditions());

        textView_testprocedurecode.setText(currentTest.getTestProcedure().getCode());
        textView_result.setText(currentTest.getTestProcedure().getResult());

        //initialize data
        ArrayList<String> entryDataLabels = new ArrayList<>();
        //for(int i=0;i< currentTest.getTestCase().getEntryData().size();i++){
        for(int i=0;i< currentTest.getTestCase().getEntryData().size();i++){
            String currentData = currentTest.getTestCase().getEntryData().get(i);
            JSONObject jsonObject = new JSONObject(currentData);
            String currentDataName = jsonObject.getString("name");
            entryDataLabels.add(currentDataName);
        }
        ArrayAdapter<String> entryDataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, entryDataLabels);
        listView_entryData.setAdapter(entryDataAdapter);
        ListViewUtils.setListViewHeightBasedOnChildren(listView_entryData);

        listView_entryData.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Intent intent = new Intent(getApplicationContext(), DataDisplayActivity.class);
                intent.putExtra("data",currentTest.getTestCase().getEntryData().get(i));
                startActivity(intent);
            }
        });

        //initialize fab
        fab_performTest.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), PerformTestActivity.class);
                intent.putExtra("id",currentTest.getId());
                intent.putExtra("testName",currentTest.getName());
                intent.putExtra("testProcedureId",currentTest.getTestProcedure().getId());
                startActivity(intent);
            }
        });

    }

    private void getTestData() {
        currentTest = new Test();

        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        if(!token.equalsIgnoreCase("")) {

            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Tests/android/" + currentTestId;

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
                        currentTest.setId(response.getString("id"));
                        currentTest.setCreationDate(response.getString("creationDate"));
                        currentTest.setName(response.getString("name"));


                        JSONObject jsonTestCase = response.getJSONObject("testCase");
                        TestCase currentTestCase = new TestCase();
                        currentTestCase.setId(jsonTestCase.getString("id"));
                        currentTestCase.setCode(jsonTestCase.getString("code"));
                        currentTestCase.setPreconditions(jsonTestCase.getString("preconditions"));

                        ArrayList<String> currentEntryData = new ArrayList<>();
                        JSONArray jsonArrayEntryData =jsonTestCase.getJSONArray("entryDataObject");

                        for(int i=0;i<jsonArrayEntryData.length();i++){
                            String currentData = jsonArrayEntryData.getJSONObject(i).toString();
                            currentEntryData.add(currentData);
                        }
                        currentTestCase.setEntryData(currentEntryData);

                        currentTest.setTestCase(currentTestCase);


                        JSONObject jsonTestProcedure = response.getJSONObject("testProcedure");
                        TestProcedure currentTestProcedure = new TestProcedure();
                        currentTestProcedure.setId(jsonTestProcedure.getString("id"));
                        currentTestProcedure.setCode(jsonTestProcedure.getString("code"));
                        currentTestProcedure.setResult(jsonTestProcedure.getString("result"));

                        currentTest.setTestProcedure(currentTestProcedure);


                        continueInit();

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

        /*
        currentTest.setId("Id1");
        currentTest.setCreationDate("07/11/2021");
        currentTest.setName("Test X");
        TestCase currentTestCase = new TestCase("1","TC-3654","User is logged in\nUser is privilleged to access the data",new ArrayList<>());
        currentTest.setTestCase(currentTestCase);
        TestProcedure currentTestProcedure = new TestProcedure();
        currentTestProcedure.setResult("Program shows the data");
        currentTestProcedure.setCode("TP-2636");
        currentTest.setTestProcedure(currentTestProcedure);

         */
    }

    private void get_position() {

        currentTestId = getIntent().getStringExtra("id");

    }

    private void initializeViews() {
        textView_name = findViewById(R.id.td_textView_name);
        textView_name.setSelected(true);
        textView_creationDate = findViewById(R.id.td_textView_creationdate);
        textView_creationDate.setSelected(true);
        textView_testcasecode = findViewById(R.id.td_textView_testcasecode);
        textView_testcasecode.setSelected(true);
        textView_testprocedurecode = findViewById(R.id.td_textView_testprocedurecode);
        textView_testprocedurecode.setSelected(true);
        textView_preconditions = findViewById(R.id.td_textView_preconditions);
        textView_result = findViewById(R.id.td_textView_result);

        listView_entryData = findViewById(R.id.td_listView_entrydata);

        fab_performTest = findViewById(R.id.perform_test);

        //check permissions
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String role = preferences.getString("role", "");
        if(!role.equalsIgnoreCase(""))
        {
            if(!role.equals("Tester")){
                fab_performTest.setVisibility(View.GONE);
            }
        }

    }
}