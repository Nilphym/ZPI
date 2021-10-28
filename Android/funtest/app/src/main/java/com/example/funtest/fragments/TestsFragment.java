package com.example.funtest.fragments;

import static com.example.funtest.MainActivity.bugList;
import static com.example.funtest.MainActivity.testPlanList;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.funtest.BugAdapter;
import com.example.funtest.MainActivity;
import com.example.funtest.R;
import com.example.funtest.TestPlanAdapter;


public class TestsFragment extends Fragment {

    RecyclerView recyclerView;
    TestPlanAdapter testPlanAdapter;


    public TestsFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_tests, container, false);

        //setup of recycler view with bug list adapter
        recyclerView = view.findViewById(R.id.tpl_recyclerView);
        recyclerView.setHasFixedSize(true);

        if(MainActivity.testPlanList.size() > 0 ){
            testPlanAdapter = new TestPlanAdapter(getContext(),MainActivity.testPlanList);
            recyclerView.setAdapter(testPlanAdapter);
            recyclerView.setLayoutManager(new LinearLayoutManager(getContext(),RecyclerView.VERTICAL,false));
        }

        return view;

    }
}