package com.example.funtest;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.NetworkResponse;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.HttpHeaderParser;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;

public class LoginActivity extends AppCompatActivity {

    String login ="";
    String password ="";

    EditText editTextLogin;
    EditText editTextPassword;

    private RequestQueue queue;

    private boolean isEmpty(EditText etText) {
        if (etText.getText().toString().trim().length() > 0)
            return false;

        return true;
    }

    private void tryToLogIn(){

        String url = "https://fun-test-zpi.herokuapp.com/api/Auth/login";

        try {
            RequestQueue requestQueue = Volley.newRequestQueue(this);
            JSONObject jsonBody = new JSONObject();
            jsonBody.put("email", login);
            jsonBody.put("password", password);

            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST,url,jsonBody, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    Log.i("LOG_RESPONSE", response.toString());

                    try {
                        String token = response.getString("token");
                        // ADD API REQUEST FOR USER KEY!!!!!!!!!
                        final Intent intent = new Intent(getApplicationContext(),MainActivity.class);

                        //Bundle dataToSend = new Bundle();
                        //dataToSend.putString("token", token);
                        //intent.putExtras(dataToSend);

                        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(getApplicationContext());
                        SharedPreferences.Editor editor = preferences.edit();
                        editor.putString("Token",token);
                        editor.apply();

                        startActivity(intent);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("LOG_RESPONSE", error.toString());
                }
            });


            requestQueue.add(jsonObjectRequest);
        } catch (JSONException e) {
            e.printStackTrace();
        }


    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();


        Button login_button = (Button) findViewById(R.id.loginButton);
        login_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View widok) {

                editTextLogin = (EditText) findViewById(R.id.login);
                editTextPassword = (EditText) findViewById(R.id.password);

                if (!isEmpty(editTextLogin) && !isEmpty(editTextPassword)) {
                    login = editTextLogin.getText().toString().trim();
                    password = editTextPassword.getText().toString();
                    tryToLogIn();

                } else {
                    Toast.makeText(getApplicationContext(), "You need to provide both login and password!", Toast.LENGTH_SHORT).show();
                }
            }
        });


    }
}