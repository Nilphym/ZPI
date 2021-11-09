package com.example.funtest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;

import com.example.funtest.objects.Test;
import com.example.funtest.objects.TestCase;
import com.example.funtest.objects.TestProcedure;
import com.example.funtest.utils.ListViewUtils;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.util.ArrayList;

public class TestDetailsActivity extends AppCompatActivity {

    TextView textView_name, textView_creationDate, textView_testcasecode, textView_testprocedurecode, textView_preconditions, textView_result;
    ListView listView_entryData;
    FloatingActionButton fab_performTest;

    private Test currentTest;
    private String currentTestId;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test_details);

        initializeViews();
        get_position();
        getTestData();

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
        for(int i=0;i< 4;i++){
            entryDataLabels.add("Entry Data "+ (i+1));
        }
        ArrayAdapter<String> entryDataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, entryDataLabels);
        listView_entryData.setAdapter(entryDataAdapter);
        ListViewUtils.setListViewHeightBasedOnChildren(listView_entryData);

        //initialize fab
        fab_performTest.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), PerformTestActivity.class);
                intent.putExtra("id",currentTest.getId());
                startActivity(intent);
            }
        });

    }

    private void getTestData() {
        currentTest = new Test();
        currentTest.setId("Id1");
        currentTest.setCreationDate("07/11/2021");
        currentTest.setName("Test X");
        TestCase currentTestCase = new TestCase("1","TC-3654","User is logged in\nUser is privilleged to access the data",new ArrayList<>());
        currentTest.setTestCase(currentTestCase);
        TestProcedure currentTestProcedure = new TestProcedure();
        currentTestProcedure.setResult("Program shows the data");
        currentTestProcedure.setCode("TP-2636");
        currentTest.setTestProcedure(currentTestProcedure);
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


    }
}