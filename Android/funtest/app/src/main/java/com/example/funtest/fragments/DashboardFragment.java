package com.example.funtest.fragments;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.Toast;

import com.example.funtest.R;

public class DashboardFragment extends Fragment {

    //check if fragment is attached to ana ctivity and do sth
    private onDashboardFragmentButtonSelected dashboardListener;

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        if (context instanceof onDashboardFragmentButtonSelected) {
            dashboardListener = (onDashboardFragmentButtonSelected) context;
        } else {
            throw new ClassCastException(context.toString() + "must implement listener");
        }
    }
    ///////////////////////////////////////////////////////////

    public DashboardFragment() {
        // Required empty public constructor
    }


    public static DashboardFragment newInstance() {
        DashboardFragment fragment = new DashboardFragment();
        //Bundle args = new Bundle();
        //args.putString(ARG_PARAM1, param1);
        //args.putString(ARG_PARAM2, param2);
        //fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        /*
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
         */
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_dashboard, container, false);
        Button pmReportsButton = view.findViewById(R.id.pm_reports_button);
        pmReportsButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dashboardListener.onDasboardButtonSelected();
            }
        });
        return view;

        //return inflater.inflate(R.layout.fragment_dashboard, container, false);
    }

    //interfeace that informs Main Activity about an action
    public interface onDashboardFragmentButtonSelected{
        public void onDasboardButtonSelected();
    }
}