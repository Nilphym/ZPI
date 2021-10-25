package com.example.funtest.fragments;

import static com.example.funtest.MainActivity.bugList;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.example.funtest.BugAdapter;
import com.example.funtest.R;


public class BugsFragment extends Fragment {

    RecyclerView recyclerView;
    BugAdapter bugAdapter;

    //check if fragment is attached to an activity and do sth
    private onBugsFragmentButtonSelected bugsListener;
    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        if (context instanceof onBugsFragmentButtonSelected) {
            bugsListener = (onBugsFragmentButtonSelected) context;
        } else {
            throw new ClassCastException(context.toString() + "must implement listener");
        }
    }
    ///////////////////////////////////////////////////////////

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

        //setup button listeners
        Button toReviewButton = view.findViewById(R.id.to_review_button);
        Button myBugsButton = view.findViewById(R.id.my_bugs_button);
        Button toFixButton = view.findViewById(R.id.to_fix_button);
        toReviewButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                bugsListener.onButtonSelectedToReview();
            }
        });
        myBugsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                bugsListener.onButtonSelectedMyBugs();
            }
        });
        toFixButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                bugsListener.onButtonSelectedToFix();
            }
        });

        return view;

        //return inflater.inflate(R.layout.fragment_bugs, container, false);
    }


    //interfeace that informs Main Activity about an action
    public interface onBugsFragmentButtonSelected{
        public void onButtonSelectedMyBugs();
        public void onButtonSelectedToFix();
        public void onButtonSelectedToReview();
    }
}