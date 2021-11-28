package com.example.funtest;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.widget.NestedScrollView;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class DataDisplayActivity extends AppCompatActivity {

    TextView textView_data;
    String data;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_data_display);

        initializeViews();
        getData();

        if (isJSONObject(data)){
            try {
                JSONObject currentObject = new JSONObject(data);
                textView_data.setText(currentObject.getString("name"));

                JSONArray currentArray = currentObject.getJSONArray("table");
                addTextviewsForArray(currentArray);

            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        else {
            textView_data.setText(data);
        }


    }

    @SuppressLint("ResourceAsColor")
    private void addTextviewsForArray(JSONArray currentArray) throws JSONException {
        LinearLayout currentView = (LinearLayout) findViewById(R.id.dd_linearLayout_main);

        LinearLayout verticalLayout = new LinearLayout(this);
        verticalLayout.setOrientation(LinearLayout.VERTICAL);
        verticalLayout.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));

        for(int i=0;i<currentArray.length();i++){
            JSONArray currentRow = currentArray.getJSONArray(i);

            LinearLayout currentHorizontalLayout = new LinearLayout(this);
            currentHorizontalLayout.setOrientation(LinearLayout.HORIZONTAL);
            currentHorizontalLayout.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT));

            for(int j=0;j<currentRow.length();j++){
                // Add textview 1
                TextView currentTextView = new TextView(this);
                currentTextView.setLayoutParams(new LinearLayout.LayoutParams(0, LinearLayout.LayoutParams.WRAP_CONTENT, 1));
                currentTextView.setText(currentRow.getString(j));
                currentTextView.setTextSize(18);
                currentTextView.setTextColor(0xff000000);
                currentTextView.setBackgroundColor(0xffE0E0E0); // hex color 0xAARRGGBB
                currentTextView.setBackgroundResource(R.drawable.table_border);
                currentTextView.setPadding(20, 20, 20, 20);// in pixels (left, top, right, bottom)

                currentHorizontalLayout.addView(currentTextView);

            }

            verticalLayout.addView(currentHorizontalLayout);

        }

        currentView.addView(verticalLayout);



    }

    private void getData() {
        this.data = getIntent().getStringExtra("data");
    }

    private void initializeViews() {
        textView_data = findViewById(R.id.dd_textView_data);
    }

    public boolean isJSONObject(String test) {
        try {
            new JSONObject(test);
        } catch (JSONException ex) {
            return false;
        }
        return true;
    }


}