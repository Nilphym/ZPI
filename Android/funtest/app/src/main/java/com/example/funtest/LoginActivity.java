package com.example.funtest;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class LoginActivity extends AppCompatActivity {

    String login ="";
    String password ="";

    EditText editTextLogin;
    EditText editTextPassword;

    private boolean isEmpty(EditText etText) {
        if (etText.getText().toString().trim().length() > 0)
            return false;

        return true;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();

        final Intent intent = new Intent(this,MainActivity.class);

        Button login_button = (Button) findViewById(R.id.loginButton);
        login_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View widok) {

                editTextLogin = (EditText) findViewById(R.id.login);
                editTextPassword = (EditText) findViewById(R.id.password);

                if (!isEmpty(editTextLogin) && !isEmpty(editTextPassword)) {
                    login = editTextLogin.getText().toString().trim();
                    password = editTextPassword.getText().toString();

                    // ADD API REQUEST FOR USER KEY!!!!!!!!!
                    Bundle dataToSend = new Bundle();
                    dataToSend.putString("login", login);
                    dataToSend.putString("password", password);

                    intent.putExtras(dataToSend);
                    startActivity(intent);

                } else {
                    Toast.makeText(getApplicationContext(), "You need to provide both login and password!", Toast.LENGTH_SHORT).show();
                }
            }
        });


    }
}