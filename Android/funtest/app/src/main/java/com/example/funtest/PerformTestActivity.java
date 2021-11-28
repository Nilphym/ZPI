package com.example.funtest;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.ParseError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.funtest.objects.Bug;
import com.example.funtest.objects.Test;
import com.example.funtest.objects.TestCase;
import com.example.funtest.objects.TestPlan;
import com.example.funtest.objects.TestProcedure;
import com.example.funtest.objects.TestStep;
import com.example.funtest.utils.ListViewUtils;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class PerformTestActivity extends AppCompatActivity {

    TextView textView_testname, textView_stepNumber, textView_stepName, textView_controlpoint;
    ListView listView_testData, listView_associatedBugs;
    FloatingActionButton fab_reportError;
    Button button_previous, button_next;

    static ArrayList<TestStep> currentTestSteps;
    int test_step_position = 0;
    static TestStep currentTestStep;

    private String testId;
    private String testProcedureId;
    private String testName;

    private Handler uiThreadHandler = new Handler();
    private Thread nextThread,prevThread;

    private ProgressDialog pDialog;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_perform_test);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();

        initializeViews();
        get_testId();
        getTestSteps();

        //set listeners for fab and listviews
        fab_reportError.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), BugReportActivity.class);
                intent.putExtra("testId",testId);
                intent.putExtra("stepId",currentTestStep.getId());
                startActivity(intent);
            }
        });

        listView_testData.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> adapterView, View view, int i, long l) {
                Intent intent = new Intent(getApplicationContext(), DataDisplayActivity.class);
                intent.putExtra("data",currentTestStep.getTestData().get(i));
                startActivity(intent);
            }
        });

        listView_associatedBugs.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Intent intent = new Intent(getApplicationContext(), BugDetailsActivityPerformTest.class);
                intent.putExtra("bugId",currentTestStep.getStepErrors().get(position).getId());
                startActivity(intent);

            }
        });

    }

    private void continueInit() throws JSONException {
        //initialize data
        currentTestStep = currentTestSteps.get(test_step_position);
        ArrayList<String> testDataLabels = new ArrayList<>();

        for(int i=0;i< currentTestStep.getTestData().size();i++){
            if (isJSONValid(currentTestStep.getTestData().get(i))){
                String currentData = currentTestStep.getTestData().get(i);
                JSONObject jsonObject = new JSONObject(currentData);
                String currentDataName = jsonObject.getString("name");
                testDataLabels.add(currentDataName);
            }
            else {
                String currentTestData = currentTestStep.getTestData().get(i);
                testDataLabels.add(currentTestData);
            }

            //testDataLabels.add("Test Data "+ (i+1));
        }
        ArrayList<String> associatedBugsLabels = new ArrayList<>();
        for(int i=0;i< currentTestStep.getStepErrors().size();i++){
            associatedBugsLabels.add(currentTestStep.getStepErrors().get(i).getCode());
        }
        //set layout data content

        textView_testname.setText(testName);
        textView_stepNumber.setText(""+(test_step_position+1));

        textView_stepName.setText(currentTestStep.getName());
        textView_controlpoint.setText(currentTestStep.getControlPoint());

        ArrayAdapter<String> testDataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, testDataLabels);
        listView_testData.setAdapter(testDataAdapter );

        ArrayAdapter<String> associatedBugsAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, associatedBugsLabels);
        listView_associatedBugs.setAdapter(associatedBugsAdapter);

        ListViewUtils.setListViewHeightBasedOnChildren(listView_testData);
        ListViewUtils.setListViewHeightBasedOnChildren(listView_associatedBugs);


    }

    @Override
    protected void onResume() {
        next_press_button_thread();
        prev_press_button_thread();
        super.onResume();
    }

    private void getTestSteps() {
        if(currentTestSteps != null){
            currentTestSteps.clear();
        }
        else{
            currentTestSteps = new ArrayList<TestStep>();
        }

        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        if(!token.equalsIgnoreCase("")) {
            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Steps/testprocedure/" + testProcedureId;

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
                            JSONObject jsonTestStep = response.getJSONObject(i);

                            TestStep currentTestStep = new TestStep();
                            currentTestStep.setId(jsonTestStep.getString("id"));
                            currentTestStep.setName(jsonTestStep.getString("name"));
                            currentTestStep.setControlPoint(jsonTestStep.getString("controlPoint"));
                            currentTestStep.setStepNumber(jsonTestStep.getInt("stepNumber"));

                            ///
                            JSONObject jsonTestData = jsonTestStep.getJSONObject("testDataObject");
                            JSONArray jsonArrayTestData = jsonTestData.getJSONArray("data");

                            ArrayList<String> currentTestStepTestData = new ArrayList<>();
                            for(int j=0;j<jsonArrayTestData.length();j++){
                                if (jsonArrayTestData.get(j) instanceof JSONObject){
                                    String currentTestData = jsonArrayTestData.getJSONObject(j).toString();
                                    currentTestStepTestData.add(currentTestData);
                                }
                                else if (jsonArrayTestData.get(j) instanceof String){
                                    String currentTestData = jsonArrayTestData.getString(j);
                                    currentTestStepTestData.add(currentTestData);
                                }

                            }
                            currentTestStep.setTestData(currentTestStepTestData);

                            ///
                            JSONArray jsonArrayErrors = jsonTestStep.getJSONArray("errors");

                            ArrayList<Bug> currentTestStepBugs = new ArrayList<>();
                            for(int k=0;k<jsonArrayErrors.length();k++){
                                JSONObject jsonError = jsonArrayErrors.getJSONObject(k);

                                Bug currentBug = new Bug();
                                currentBug.setCode(jsonError.getString("code"));
                                currentBug.setId(jsonError.getString("id"));

                                currentTestStepBugs.add(currentBug);
                            }
                            currentTestStep.setStepErrors(currentTestStepBugs);

                            currentTestSteps.add(currentTestStep);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                    try {
                        continueInit();
                    } catch (JSONException e) {
                        e.printStackTrace();
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
        for(int i=0;i<3;i++){
            TestStep currentTestStep = new TestStep();
            currentTestStep.setName("Perfrorm certain action number " +(i+1));
            currentTestStep.setStepNumber(i+1);
            currentTestStep.setControlPoint("Check if screen shows result number "+(i+1));
            ArrayList<String> currentTestData = new ArrayList<>();
            ArrayList<Bug> currentstepErrors = new ArrayList<>();
            for(int j=0;j<4;j++){
                currentTestData.add("TestData " + (j+1));
                Bug currentBug = new Bug();
                currentBug.setCode("E-125" +j);
                currentstepErrors.add(currentBug);
            }
            currentTestStep.setTestData(currentTestData);
            currentTestStep.setStepErrors(currentstepErrors);

            currentTestSteps.add(currentTestStep);
        }

         */

    }

    private void get_testId() {

        testId = getIntent().getStringExtra("id");
        testName = getIntent().getStringExtra("testName");
        testProcedureId = getIntent().getStringExtra("testProcedureId");

    }

    private void initializeViews() {
        textView_testname = findViewById(R.id.pt_textView_name);
        textView_testname.setSelected(true);
        textView_stepNumber = findViewById(R.id.pt_textView_step);
        textView_stepNumber.setSelected(true);
        textView_stepName = findViewById(R.id.td_textView_stepname);
        textView_controlpoint = findViewById(R.id.td_textView_controlpoint);

        listView_testData = findViewById(R.id.pt_listView_testdata);
        listView_associatedBugs = findViewById(R.id.pt_listView_errors);

        fab_reportError = findViewById(R.id.pt_fab_reportBug);

        button_previous = findViewById(R.id.button_previous);
        button_next = findViewById(R.id.button_next);



    }

    private void next_press_button_thread() {
        nextThread = new Thread(){
            @Override
            public void run() {
                super.run();
                button_next.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        nextButtonClicked();
                    }
                });

            }
        };
        nextThread.start();
    }

    private void nextButtonClicked() {
        if((test_step_position + 1 ) > (currentTestSteps.size() - 1)){
            //show modal
            AlertDialog.Builder builder = new AlertDialog.Builder(PerformTestActivity.this);
            builder.setMessage("Do You Want To Finish The Execution Of This Test?")
                    .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            // do something
                            postTestExecuted();
                        }
                    })
                    .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                        public void onClick(DialogInterface dialog, int id) {
                            dialog.dismiss();
                        }
                    });

            builder.show();
        }
        test_step_position = ((test_step_position + 1 ) > (currentTestSteps.size() - 1) ? (currentTestSteps.size() - 1) : (test_step_position  + 1 ));

        try {
            continueInit();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        /*
        currentTestStep = currentTestSteps.get(test_step_position);

        //initialize data
        currentTestStep = currentTestSteps.get(test_step_position);
        ArrayList<String> testDataLabels = new ArrayList<>();
        for(int i=0;i< currentTestStep.getTestData().size();i++){
            testDataLabels.add("Test Data "+ (i+1));
        }
        ArrayList<String> associatedBugsLabels = new ArrayList<>();
        for(int i=0;i< currentTestStep.getStepErrors().size();i++){
            associatedBugsLabels.add(currentTestStep.getStepErrors().get(i).getCode());
        }
        //set layout data content

        textView_testname.setText(testName);
        textView_stepNumber.setText(""+(test_step_position+1));

        textView_stepName.setText(currentTestStep.getName());
        textView_controlpoint.setText(currentTestStep.getControlPoint());

        ArrayAdapter<String> testDataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, testDataLabels);
        listView_testData.setAdapter(testDataAdapter );

        ArrayAdapter<String> associatedBugsAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, associatedBugsLabels);
        listView_associatedBugs.setAdapter(associatedBugsAdapter);


        ListViewUtils.setListViewHeightBasedOnChildren(listView_testData);
        ListViewUtils.setListViewHeightBasedOnChildren(listView_associatedBugs);

         */

    }

    private void postTestExecuted() {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        if(!token.equalsIgnoreCase("")) {

            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Tests/"+testId+"/execute";

            RequestQueue requestQueue = Volley.newRequestQueue(this);
            //JSONObject jsonBody = new JSONObject();
            //jsonBody.put("token", token);

            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.PUT,url,null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    //Log.i("LOG_RESPONSE", response.toString());
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
                    }
                    finish();
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
                @Override
                protected Response<JSONObject> parseNetworkResponse(NetworkResponse response) {


                    try {
                        String json = new String(
                                response.data,
                                "UTF-8"
                        );

                        if (json.length() == 0) {
                            return Response.success(
                                    null,
                                    HttpHeaderParser.parseCacheHeaders(response)
                            );
                        }
                        else {
                            return super.parseNetworkResponse(response);
                        }
                    }
                    catch (UnsupportedEncodingException e) {
                        return Response.error(new ParseError(e));
                    }


                }
            };

            requestQueue.add(jsonObjectRequest);
        }
    }

    private void prev_press_button_thread() {
        prevThread = new Thread(){
            @Override
            public void run() {
                super.run();
                button_previous.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        prevButtonClicked();
                    }
                });

            }
        };
        prevThread.start();
    }

    private void prevButtonClicked() {
        test_step_position = ((test_step_position - 1 ) < 0 ? (0) : (test_step_position -1 ));
        try {
            continueInit();
        } catch (JSONException e) {
            e.printStackTrace();
        }
        /*
        currentTestStep = currentTestSteps.get(test_step_position);


        //initialize data
        currentTestStep = currentTestSteps.get(test_step_position);
        ArrayList<String> testDataLabels = new ArrayList<>();
        for(int i=0;i< currentTestStep.getTestData().size();i++){
            testDataLabels.add("Test Data "+ (i+1));
        }
        ArrayList<String> associatedBugsLabels = new ArrayList<>();
        for(int i=0;i< currentTestStep.getStepErrors().size();i++){
            associatedBugsLabels.add(currentTestStep.getStepErrors().get(i).getCode());
        }
        //set layout data content

        textView_testname.setText(testName);
        textView_stepNumber.setText(""+(test_step_position+1));

        textView_stepName.setText(currentTestStep.getName());
        textView_controlpoint.setText(currentTestStep.getControlPoint());

        ArrayAdapter<String> testDataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, testDataLabels);
        listView_testData.setAdapter(testDataAdapter );

        ArrayAdapter<String> associatedBugsAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, associatedBugsLabels);
        listView_associatedBugs.setAdapter(associatedBugsAdapter);

        ListViewUtils.setListViewHeightBasedOnChildren(listView_testData);
        ListViewUtils.setListViewHeightBasedOnChildren(listView_associatedBugs);

         */
    }

    public boolean isJSONValid(String test) {
        try {
            new JSONObject(test);
        } catch (JSONException ex) {
            return false;
        }
        return true;
    }

    private void getTestSteps2() {
        if(currentTestSteps != null){
            currentTestSteps.clear();
        }
        else{
            currentTestSteps = new ArrayList<TestStep>();
        }

        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        if(!token.equalsIgnoreCase("")) {
            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Tests/testExecution/"+ testId;

            RequestQueue requestQueue = Volley.newRequestQueue(this);
            //JSONObject jsonBody = new JSONObject();
            //jsonBody.put("token", token);

            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
                    }
                    JSONArray steps = null;
                    try {
                        steps = response.getJSONArray("steps");
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                    for (int i = 0; i < steps.length(); i++) {
                        try {
                            JSONObject jsonTestStep = steps.getJSONObject(i);

                            TestStep currentTestStep = new TestStep();
                            currentTestStep.setId(jsonTestStep.getString("id"));
                            currentTestStep.setName(jsonTestStep.getString("name"));
                            currentTestStep.setControlPoint(jsonTestStep.getString("controlPoint"));
                            currentTestStep.setStepNumber(jsonTestStep.getInt("stepNumber"));

                            ///
                            JSONArray jsonArrayTestData = jsonTestStep.getJSONArray("testData");

                            ArrayList<String> currentTestStepTestData = new ArrayList<>();
                            for (int j = 0; j < jsonArrayTestData.length(); j++) {
                                if (jsonArrayTestData.get(j) instanceof JSONObject) {
                                    String currentTestData = jsonArrayTestData.getJSONObject(j).toString();
                                    currentTestStepTestData.add(currentTestData);
                                } else if (jsonArrayTestData.get(j) instanceof String) {
                                    String currentTestData = jsonArrayTestData.getString(j);
                                    currentTestStepTestData.add(currentTestData);
                                }

                            }
                            currentTestStep.setTestData(currentTestStepTestData);

                            ///
                            JSONArray jsonArrayErrors = jsonTestStep.getJSONArray("errorIds");

                            ArrayList<Bug> currentTestStepBugs = new ArrayList<>();
                            for (int k = 0; k < jsonArrayTestData.length(); k++) {
                                JSONObject jsonError = jsonArrayErrors.getJSONObject(k);

                                Bug currentBug = new Bug();
                                currentBug.setCode(jsonError.getString("code"));
                                currentBug.setId(jsonError.getString("id"));

                                currentTestStepBugs.add(currentBug);
                            }
                            currentTestStep.setStepErrors(currentTestStepBugs);

                            currentTestSteps.add(currentTestStep);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }

                    }
                    try {
                        continueInit();
                    } catch (JSONException e) {
                        e.printStackTrace();
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


            requestQueue.add(jsonObjectRequest);
        }


    }
}