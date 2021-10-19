package com.example.funtest.fragments;

import static com.example.funtest.MainActivity.bugList;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.funtest.BugAdapter;
import com.example.funtest.R;


public class BugsFragment extends Fragment {

    RecyclerView recyclerView;
    BugAdapter bugAdapter;

    public BugsFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_bugs, container, false);

        //setup of recycler view with bug list adapter
        recyclerView = view.findViewById(R.id.bl_recyclerView);
        recyclerView.setHasFixedSize(true);

        if(bugList.size() > 0 ){
            bugAdapter = new BugAdapter(getContext(),bugList);
            recyclerView.setAdapter(bugAdapter);
            recyclerView.setLayoutManager(new LinearLayoutManager(getContext(),RecyclerView.VERTICAL,false));
        }
        return view;

        //return inflater.inflate(R.layout.fragment_bugs, container, false);
    }
}