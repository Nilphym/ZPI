package com.example.funtest;

import static com.example.funtest.MainActivity.bugList;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import com.example.funtest.objects.Bug;

import java.util.ArrayList;

public class BugActivityToFix extends AppCompatActivity {

    RecyclerView recyclerView;
    BugAdapterToFix bugAdapter;
    public static ArrayList<Bug> bugListToFix;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bug_to_fix);

        getBugListToFix();

        //setup of recycler view with bug list adapter
        recyclerView = findViewById(R.id.bl_recyclerView);
        recyclerView.setHasFixedSize(true);

        if(bugListToFix.size() > 0 ){
            bugAdapter = new BugAdapterToFix(getApplicationContext(),bugListToFix);
            recyclerView.setAdapter(bugAdapter);
            recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext(),RecyclerView.VERTICAL,false));
        }
    }

    private void getBugListToFix() {
        BugActivityToFix.bugListToFix = MainActivity.bugList;
    }
}