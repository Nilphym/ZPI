package com.example.funtest;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.provider.OpenableColumns;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
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
import com.example.funtest.objects.TestCase;
import com.example.funtest.objects.TestProcedure;
import com.example.funtest.utils.ListViewUtils;
import com.example.funtest.utils.VolleyMultipartRequest;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class BugReportActivity extends AppCompatActivity {

    EditText editText_name, editText_description, editText_deadline;
    Spinner spinner_type, spinner_impact, spinner_priority;
    ListView listView_attachments;
    Button button_selectAttachments, button_deleteAttachment;
    FloatingActionButton fab_report, fab_cancel;

    ArrayList<Bitmap> attachmentsBitMap;
    ArrayList<String> attachmentsNames;
    public static final int PICK_IMAGE = 1;

    ArrayList<String> labels_type;
    ArrayList<String> labels_impact;
    ArrayList<String> labels_priority;

    final Calendar myCalendar = Calendar.getInstance();

    private String testId;
    private String stepId;
    private String finalDate;

    private ProgressDialog pDialog;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bug_report);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();

        initializeViews();
        get_testId();

        //initialize spinner lists
        labels_type = new ArrayList<>();
        labels_type.add("Functional");
        labels_type.add("Logical");
        labels_type.add("Wrong Datatype");

        labels_impact = new ArrayList<>();
        labels_impact.add("High");
        labels_impact.add("Medium");
        labels_impact.add("Low");

        labels_priority = new ArrayList<>();
        labels_priority.add("High");
        labels_priority.add("Medium");
        labels_priority.add("Low");

        //initialize bitmap list
        attachmentsBitMap = new ArrayList<>();
        attachmentsNames = new ArrayList<>();

        //initialize calendar date picker

        DatePickerDialog.OnDateSetListener date = new DatePickerDialog.OnDateSetListener() {

            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                // TODO Auto-generated method stub
                myCalendar.set(Calendar.YEAR, year);
                myCalendar.set(Calendar.MONTH, monthOfYear);
                myCalendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
                updateDeadlineLabel();
            }

        };

        editText_deadline.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub
                new DatePickerDialog(BugReportActivity.this, date, myCalendar
                        .get(Calendar.YEAR), myCalendar.get(Calendar.MONTH),
                        myCalendar.get(Calendar.DAY_OF_MONTH)).show();
            }
        });

        //initialize spinners
        ArrayAdapter<String> adapter_type = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_dropdown_item, labels_type);
        spinner_type.setAdapter(adapter_type);
        ArrayAdapter<String> adapter_impact = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_dropdown_item, labels_impact);
        spinner_impact.setAdapter(adapter_impact);
        ArrayAdapter<String> adapter_priority = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_dropdown_item, labels_priority);
        spinner_priority.setAdapter(adapter_priority);

        //initialize attachments buttons
        button_selectAttachments.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE);
            }
        });
        button_deleteAttachment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(attachmentsBitMap.size()>0){
                    attachmentsBitMap.remove((attachmentsBitMap.size()-1));
                    attachmentsNames.remove((attachmentsNames.size()-1));
                    refreshAttachmentsList();
                }
            }
        });

        fab_report.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                reportBug();
            }
        });

        fab_cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        //initialize attachments listview
        refreshAttachmentsList();


    }

    private void initializeViews() {
        editText_name = findViewById(R.id.br_editText_name);
        editText_description = findViewById(R.id.br_editText_description);
        editText_deadline = findViewById(R.id.br_editText_deadline);

        spinner_type = findViewById(R.id.br_spinner_type);
        spinner_impact = findViewById(R.id.br_spinner_impact);
        spinner_priority = findViewById(R.id.br_spinner_priority);

        listView_attachments = findViewById(R.id.br_listView_attachments);

        button_selectAttachments = findViewById(R.id.br_button_selectattachments);
        button_deleteAttachment = findViewById(R.id.br_button_deselectattachments);
        fab_report = findViewById(R.id.br_fab_report);
        fab_cancel = findViewById(R.id.br_fab_cancel);
    }

    private void get_testId() {

        testId = getIntent().getStringExtra("testId");
        stepId = getIntent().getStringExtra("stepId");

    }

    private void updateDeadlineLabel() {
        String myFormat = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"; //In which you need put here
        SimpleDateFormat sdf = new SimpleDateFormat(myFormat, Locale.UK);

        editText_deadline.setText(sdf.format(myCalendar.getTime()));
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE) {
            if (data == null) {
                //Display an error
                return;
            }
            try {
                InputStream inputStream = getApplicationContext().getContentResolver().openInputStream(data.getData());
                Bitmap selectedImage = BitmapFactory.decodeStream(inputStream);
                attachmentsBitMap.add(selectedImage);
                attachmentsNames.add(getFileName(data.getData()));
                refreshAttachmentsList();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }

        }
    }

    private void refreshAttachmentsList() {
        ArrayAdapter<String> entryDataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, attachmentsNames);
        listView_attachments.setAdapter(entryDataAdapter);
        ListViewUtils.setListViewHeightBasedOnChildren(listView_attachments);


    }

    public String getFileName(Uri uri) {
        String result = null;
        if (uri.getScheme().equals("content")) {
            Cursor cursor = getContentResolver().query(uri, null, null, null, null);
            try {
                if (cursor != null && cursor.moveToFirst()) {
                    result = cursor.getString(cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME));
                }
            } finally {
                cursor.close();
            }
        }
        if (result == null) {
            result = uri.getPath();
            int cut = result.lastIndexOf('/');
            if (cut != -1) {
                result = result.substring(cut + 1);
            }
        }
        return result;
    }

    private void reportBug(){
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        String userId = preferences.getString("userId","");

        if(!token.equalsIgnoreCase("")) {

            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Errors";

            RequestQueue requestQueue = Volley.newRequestQueue(this);

            Date c = java.util.Calendar.getInstance().getTime();
            SimpleDateFormat df1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.getDefault());
            finalDate = df1.format(c);

             /*JSONObject jsonBody = new JSONObject();
            try {

                Date c = java.util.Calendar.getInstance().getTime();
                SimpleDateFormat df1 = new SimpleDateFormat("dd-MMM-yyyy", Locale.getDefault());
                String formattedDate1 = df1.format(c);

                SimpleDateFormat df2 = new SimpleDateFormat("HH:mm:ssZ", Locale.getDefault());
                String formattedDate2 = df2.format(c);

                String finalDate = formattedDate1+"T"+formattedDate2;

                jsonBody.put("name", editText_name.getText());
                jsonBody.put("testId", testId);
                jsonBody.put("reportDate", finalDate);
                jsonBody.put("description", editText_description.getText());
                jsonBody.put("deadline", editText_deadline.getText());
                jsonBody.put("errorImpact", spinner_impact.getSelectedItem().toString());
                jsonBody.put("errorPriority", spinner_priority.getSelectedItem().toString());
                jsonBody.put("errorType", spinner_type.getSelectedItem().toString());
                jsonBody.put("stepId", stepId);
                jsonBody.put("testerId", userId);
            } catch (JSONException e) {
                e.printStackTrace();
            }
            */

            StringRequest sr = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {
                    Log.i("LOG_RESPONSE", response.toString());
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
                    }

                    if(attachmentsBitMap.size()>0){
                        uploadEveryImage(response);
                    }
                    Toast.makeText(getApplicationContext(), "Bug Reported", Toast.LENGTH_SHORT).show();
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
                    HashMap<String, String> params2 = new HashMap<String, String>();
                    params2.put("name", editText_name.getText().toString());
                    params2.put("testId", testId);
                    params2.put("reportDate", finalDate);
                    params2.put("description", editText_description.getText().toString());
                    params2.put("deadline", editText_deadline.getText().toString());
                    params2.put("errorImpact", spinner_impact.getSelectedItem().toString());
                    params2.put("errorPriority", spinner_priority.getSelectedItem().toString());
                    params2.put("errorType", spinner_type.getSelectedItem().toString());
                    params2.put("stepId", stepId);
                    params2.put("testerId", userId);
                    return new JSONObject(params2).toString().getBytes();
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

            /*
            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST,url,jsonBody, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Log.i("LOG_RESPONSE", response.toString());
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
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

             */

            requestQueue.add(sr);
        }

    }

    private void uploadEveryImage(String bugId){
        for(int i=0;i<attachmentsBitMap.size();i++){
            uploadBitmap(attachmentsBitMap.get(i), bugId);
        }
    }

    private void uploadBitmap(final Bitmap bitmap, String bugId) {

        String url = "https://api.imgbb.com/1/upload?key=65fb0fa241f570bb88c73e8678430d0d";

        VolleyMultipartRequest volleyMultipartRequest = new VolleyMultipartRequest(Request.Method.POST, url,
                new Response.Listener<NetworkResponse>() {
                    @Override
                    public void onResponse(NetworkResponse response) {
                        try {
                            JSONObject obj = new JSONObject(new String(response.data));
                            //Toast.makeText(getApplicationContext(), obj.getString("data"), Toast.LENGTH_SHORT).show();
                            Log.i("LOG_RESPONSE", obj.getString("data"));

                            JSONObject dataObject = obj.getJSONObject("data");
                            String imageUrl = dataObject.getString("url");
                            Log.i("LOG_RESPONSE", imageUrl);


                            uploadImageURL(imageUrl, bugId);


                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_LONG).show();
                        Log.e("GotError",""+error.getMessage());

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
            protected Map<String, DataPart> getByteData() {
                Map<String, DataPart> params = new HashMap<>();
                long imagename = System.currentTimeMillis();
                params.put("image", new DataPart(imagename + ".png", getFileDataFromDrawable(bitmap)));
                return params;
            }
        };

        //adding the request to volley
        Volley.newRequestQueue(this).add(volleyMultipartRequest);
    }

    public byte[] getFileDataFromDrawable(Bitmap bitmap) {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 80, byteArrayOutputStream);
        return byteArrayOutputStream.toByteArray();
    }

    private void uploadImageURL(String imageUrl, String bugId){
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        if(!token.equalsIgnoreCase("")) {

            pDialog = new ProgressDialog(this);
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();


            String url = "https://fun-test-zpi.herokuapp.com/api/Attachments";

            RequestQueue requestQueue = Volley.newRequestQueue(this);



            StringRequest sr = new StringRequest(Request.Method.POST, url, new Response.Listener<String>() {
                @Override
                public void onResponse(String response) {
                    Log.i("LOG_RESPONSE", response.toString());
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
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
                    HashMap<String, String> params2 = new HashMap<String, String>();
                    params2.put("imageLink", imageUrl);
                    params2.put("errorId", bugId.replaceAll("^\"|\"$", ""));
                    return new JSONObject(params2).toString().getBytes();
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
}