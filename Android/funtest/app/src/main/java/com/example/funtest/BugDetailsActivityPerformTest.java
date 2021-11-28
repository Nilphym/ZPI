package com.example.funtest;

import androidx.appcompat.app.AppCompatActivity;

import android.app.AlertDialog;
import android.app.ProgressDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
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
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.example.funtest.objects.Bug;
import com.example.funtest.objects.TestCase;
import com.example.funtest.objects.TestProcedure;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class BugDetailsActivityPerformTest extends AppCompatActivity {

    TextView textView_name, textView_state, textView_functionality, textView_type, textView_impact, textView_priority, textView_retestsRequired, textView_retestsDone, textView_retestsFailed, textView_deadline, textView_reportDate, textView_endDate, textView_description;

    Button button_bugAttachments, button_setAsFixed, getButton_setAsUnfixed;

    Bug currentBug;
    String bugId;

    private ProgressDialog pDialog;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bug_details_perform_test);

        initializeViews();
        get_position();

        get_bugData();

        //check permissions


        button_bugAttachments.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), BugDetailsAttachmentsActivity.class);
                intent.putExtra("id",currentBug.getId());
                intent.putExtra("sourceActivityName","BugDetailsActivityPerformTest");
                startActivity(intent);
            }
        });

        button_setAsFixed.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog.Builder builder = new AlertDialog.Builder(BugDetailsActivityPerformTest.this);
                builder.setMessage("Do You Want To Set This Bug As Fixed?")
                        .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                // do something
                                //Toast.makeText(getApplicationContext(), "Bug Set As Fixed", Toast.LENGTH_SHORT).show();
                                postAsFixedOrUnfixed(true);
                                //finish();
                            }
                        })
                        .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                dialog.dismiss();
                            }
                        });

                builder.show();
            }
        });

        getButton_setAsUnfixed.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                AlertDialog.Builder builder = new AlertDialog.Builder(BugDetailsActivityPerformTest.this);
                builder.setMessage("Do You Want To Set This Bug As Unfixed?")
                        .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                // do something
                                //Toast.makeText(getApplicationContext(), "Bug Set As Unfixed", Toast.LENGTH_SHORT).show();
                                //finish();
                                postAsFixedOrUnfixed(false);
                            }
                        })
                        .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                            public void onClick(DialogInterface dialog, int id) {
                                dialog.dismiss();
                            }
                        });

                builder.show();
            }
        });
    }

    private void postAsFixedOrUnfixed(Boolean isFixed) {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");

        if(!token.equalsIgnoreCase("")) {

            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Reviews/" +currentBug.getId();

            RequestQueue requestQueue = Volley.newRequestQueue(this);

            StringRequest sr = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {
                    Log.i("LOG_RESPONSE", response.toString());
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
                    }

                    Toast.makeText(getApplicationContext(), "Bug Reviewed", Toast.LENGTH_SHORT).show();
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
                    if (error == null || error.networkResponse == null) {
                        return;
                    }

                    String body;
                    //get status code here
                    final String statusCode = String.valueOf(error.networkResponse.statusCode);
                    //get response body and parse with appropriate encoding
                    try {
                        body = new String(error.networkResponse.data,"UTF-8");
                        Log.e("LOG_ERROR_DATA", body);

                    } catch (UnsupportedEncodingException e) {
                        // exception
                    }

                    //do stuff with the body...
                }
            }) {
                @Override
                public byte[] getBody() throws AuthFailureError {
                    HashMap<String, Boolean> params2 = new HashMap<String, Boolean>();
                    params2.put("result", isFixed);

                    return new JSONObject(params2).toString().getBytes();
                    /*
                    HashMap<String, String> params2 = new HashMap<String, String>();
                    if(isFixed){
                        params2.put("result", "true");
                    }
                    else{
                        params2.put("result", "false");
                    }
                    return new JSONObject(params2).toString().getBytes();
                    */
                }

                @Override
                public String getBodyContentType() {
                    return "application/json";
                }

                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    Map<String, String> params = new HashMap<String, String>();
                    params.put("Authorization", "Bearer "+ token);
                    return params;
                }
            };


            requestQueue.add(sr);
        }

    }

    private void get_bugData() {
        currentBug = new Bug();
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        if(!token.equalsIgnoreCase("")) {

            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Errors/" + bugId;

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
                        currentBug.setId(response.getString("id"));
                        currentBug.setDeadline(response.getString("deadline"));
                        currentBug.setDescription(response.getString("description"));
                        currentBug.setEndDate(response.getString("endDate"));
                        currentBug.setImpact(response.getString("errorImpact"));
                        currentBug.setName(response.getString("name"));
                        currentBug.setCode(response.getString("code"));
                        currentBug.setPriority(response.getString("errorPriority"));
                        currentBug.setReportDate(response.getString("reportDate"));
                        currentBug.setState(response.getString("errorState"));
                        currentBug.setType(response.getString("errorType"));
                        currentBug.setFunctionality(response.getString("functionality"));
                        currentBug.setRetestsRequired(response.getInt("retestsRequired"));
                        currentBug.setRetestsDone(response.getInt("retestsDone"));
                        currentBug.setRetestsFailed(response.getInt("retestsFailed"));

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
    }

    private void continueInit() {
        if(currentBug.getState().equals("Retest") || currentBug.getState().equals("Fixed")){
            //everything okay
        }
        else{
            button_setAsFixed.setVisibility(View.GONE);
            getButton_setAsUnfixed.setVisibility(View.GONE);
        }


        //setting textviews in layout with current bug details
        textView_name.setText(currentBug.getName());
        textView_state.setText(currentBug.getState());
        textView_functionality.setText(currentBug.getFunctionality());
        textView_type.setText(currentBug.getType());
        textView_impact.setText(currentBug.getImpact());
        textView_priority.setText(currentBug.getPriority());

        String retestsRequired = String.valueOf(currentBug.getRetestsRequired());
        String retestsDone = String.valueOf(currentBug.getRetestsDone());
        String retestsFailed = String.valueOf(currentBug.getRetestsFailed());
        textView_retestsRequired.setText(retestsRequired);
        textView_retestsDone.setText(retestsDone);
        textView_retestsFailed.setText(retestsFailed);

        textView_deadline.setText(currentBug.getDeadline());
        textView_reportDate.setText(currentBug.getReportDate());
        textView_endDate.setText(currentBug.getEndDate());
        textView_description.setText(currentBug.getDescription());

    }

    private void get_position() {

        bugId = getIntent().getStringExtra("bugId");

    }

    private void initializeViews() {
        textView_name = findViewById(R.id.bd_textView_name);
        textView_name.setSelected(true);
        textView_state = findViewById(R.id.bd_textView_state);
        textView_state.setSelected(true);
        textView_functionality = findViewById(R.id.bd_textView_functionality);
        textView_functionality.setSelected(true);
        textView_type = findViewById(R.id.bd_textView_type);
        textView_type.setSelected(true);
        textView_impact = findViewById(R.id.bd_textView_impact);
        textView_impact.setSelected(true);
        textView_priority = findViewById(R.id.bd_textView_priority);
        textView_priority.setSelected(true);
        textView_retestsRequired = findViewById(R.id.bd_textView_retestsRequired);
        textView_retestsRequired.setSelected(true);
        textView_retestsDone = findViewById(R.id.bd_textView_retestsDone);
        textView_retestsDone.setSelected(true);
        textView_retestsFailed = findViewById(R.id.bd_textView_retestsFailed);
        textView_retestsFailed.setSelected(true);
        textView_deadline = findViewById(R.id.bd_textView_deadline);
        textView_deadline.setSelected(true);
        textView_reportDate = findViewById(R.id.bd_textView_reportDate);
        textView_reportDate.setSelected(true);
        textView_endDate = findViewById(R.id.bd_textView_endDate);
        textView_endDate.setSelected(true);
        textView_description = findViewById(R.id.bd_textView_description);

        button_bugAttachments = findViewById(R.id.bd_button_attachments);
        button_setAsFixed = findViewById(R.id.bd_button_fixed);
        getButton_setAsUnfixed = findViewById(R.id.bd_button_unfixed);

    }
}