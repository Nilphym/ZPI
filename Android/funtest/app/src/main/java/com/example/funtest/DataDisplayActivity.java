package com.example.funtest;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.TextView;

public class DataDisplayActivity extends AppCompatActivity {

    TextView textView_data;
    String data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_data_display);

        initializeViews();
        getData();

        textView_data.setText(data);

    }

    private void getData() {
        this.data = getIntent().getStringExtra("data");
    }

    private void initializeViews() {
        textView_data = findViewById(R.id.dd_textView_data);
    }
}