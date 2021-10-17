package com.example.funtest.fragments;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.funtest.R;


public class BugsFragment extends Fragment {

    public BugsFragment() {
        // Required empty public constructor
    }


    public static BugsFragment newInstance() {
        BugsFragment fragment = new BugsFragment();
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_bugs, container, false);
        return view;

        //return inflater.inflate(R.layout.fragment_bugs, container, false);
    }
}