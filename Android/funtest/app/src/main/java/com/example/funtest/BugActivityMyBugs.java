package com.example.funtest;

import static com.example.funtest.MainActivity.bugList;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import com.example.funtest.objects.Bug;

import java.util.ArrayList;

public class BugActivityMyBugs extends AppCompatActivity {

    RecyclerView recyclerView;
    BugAdapterMyBugs bugAdapter;
    public static ArrayList<Bug> bugListMyBugs;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bug_my_bugs);

        getBugListMyBugs();

        //setup of recycler view with bug list adapter
        recyclerView = findViewById(R.id.bl_recyclerView);
        recyclerView.setHasFixedSize(true);

        if(bugListMyBugs.size() > 0 ){
            bugAdapter = new BugAdapterMyBugs(getApplicationContext(),bugListMyBugs);
            recyclerView.setAdapter(bugAdapter);
            recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext(),RecyclerView.VERTICAL,false));
        }
    }

    private void getBugListMyBugs() {
        BugActivityMyBugs.bugListMyBugs = MainActivity.bugList;
    }

    @Override
    protected void onResume() {
        super.onResume();

        //get bug list again


        recyclerView = findViewById(R.id.bl_recyclerView);
        recyclerView.setHasFixedSize(true);

        if(bugListMyBugs.size() > 0 ){
            bugAdapter = new BugAdapterMyBugs(getApplicationContext(),bugListMyBugs);
            recyclerView.setAdapter(bugAdapter);
            recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext(),RecyclerView.VERTICAL,false));
        }
    }
}