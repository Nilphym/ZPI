package com.example.funtest.fragments;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.preference.PreferenceManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.example.funtest.MainActivity;
import com.example.funtest.R;
import com.example.funtest.objects.Bug;

import org.eazegraph.lib.charts.BarChart;
import org.eazegraph.lib.charts.PieChart;
import org.eazegraph.lib.models.BarModel;
import org.eazegraph.lib.models.PieModel;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class DashboardFragment extends Fragment {

    //check if fragment is attached to an activity and do sth
    private onDashboardFragmentButtonSelected dashboardListener;

    TextView textView_days, textView_testers, textView_developers, textView_testSuites, textView_rejectedBugs;
    PieChart pieChart_bugsByImpact, pieChart_bugsByPriority;
    BarChart barChart_bugsByStatus;

    private ProgressDialog pDialog;


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
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_dashboard, container, false);
        return view;

    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        initializeViews(view);

        getDashboardData();

        setupChartBugsByImpact();
        setupChartBugsByPriority();
        setupChartBugsByStatus();
    }

    private void getDashboardData() {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(getContext());
        String token = preferences.getString("Token", "");
        if(!token.equalsIgnoreCase("")) {
            pDialog = new ProgressDialog(getContext());
            // Showing progress dialog before making http request
            pDialog.setMessage("Loading...");
            pDialog.show();

            String url = "https://fun-test-zpi.herokuapp.com/api/Chart";

            RequestQueue requestQueue = Volley.newRequestQueue(getContext());

            JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
                    }

                    try {
                        String daysFromStart = String.valueOf(response.getInt("daysFromStart"));
                        String testersNumber = String.valueOf(response.getInt("testersNumber"));
                        String devsNumber = String.valueOf(response.getInt("devsNumber"));
                        String testSuitesNumber = String.valueOf(response.getInt("testSuitesNumber"));

                        textView_days.setText(daysFromStart);
                        textView_testers.setText(testersNumber);
                        textView_developers.setText(devsNumber);
                        textView_testSuites.setText(testSuitesNumber);

                    } catch (JSONException e) {
                        e.printStackTrace();
                    }

                }
            }, new Response.ErrorListener(){
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("LOG_RESPONSE", error.toString());
                    if (pDialog != null) {
                        pDialog.dismiss();
                        pDialog = null;
                    }

                    if (error == null || error.networkResponse == null) {
                        return;
                    }

                    String body;
                    //get status code here
                    final String statusCode = String.valueOf(error.networkResponse.statusCode);
                    //get response body and parse with appropriate encoding
                    try {
                        body = new String(error.networkResponse.data,"UTF-8");
                        Log.e("LOG_ERROR_DATA", body);

                    } catch (UnsupportedEncodingException e) {
                        // exception
                    }

                }
            }){
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    Map<String, String> params = new HashMap<String, String>();
                    params.put("Authorization", "Bearer "+ token);
                    return params;
                }
            };


            requestQueue.add(jsonObjectRequest);
        }
    }

    private void setupChartBugsByStatus() {
        int state_New = 0;
        int state_Open = 0;
        int state_Fixed = 0;
        int state_Retest = 0;
        int state_Closed = 0;
        int state_Rejected = 0;
        int state_Reopened = 0;
        if(MainActivity.bugList != null){
            for(int i=0; i< MainActivity.bugList.size();i++) {
                if(MainActivity.bugList.get(i).getState().equals("New")){
                    state_New++;
                }
                else if(MainActivity.bugList.get(i).getState().equals("Open")){
                    state_Open++;
                }
                else if(MainActivity.bugList.get(i).getState().equals("Fixed")){
                    state_Fixed++;
                }
                else if(MainActivity.bugList.get(i).getState().equals("Retest")){
                    state_Retest++;
                }
                else if(MainActivity.bugList.get(i).getState().equals("Closed")){
                    state_Closed++;
                }
                else if(MainActivity.bugList.get(i).getState().equals("Rejected")){
                    state_Rejected++;
                }
                else if(MainActivity.bugList.get(i).getState().equals("Reopened")){
                    state_Reopened++;
                }

            }

        }

        textView_rejectedBugs.setText(String.valueOf(state_Rejected));

        barChart_bugsByStatus.addBar(new BarModel("New", state_New, 0xFF4d9052));
        barChart_bugsByStatus.addBar(new BarModel("Open",state_Open,  0xFF1b986f));
        barChart_bugsByStatus.addBar(new BarModel("Fixed",state_Fixed, 0xFF009f90));
        barChart_bugsByStatus.addBar(new BarModel("Retest",state_Retest, 0xFF00a4b1));
        barChart_bugsByStatus.addBar(new BarModel("Closed",state_Closed, 0xFF00a7cf));
        barChart_bugsByStatus.addBar(new BarModel("Rejected",state_Rejected,  0xFF00a8e7));
        barChart_bugsByStatus.addBar(new BarModel("Reopened",state_Reopened, 0xFF42a5f5));

        barChart_bugsByStatus.startAnimation();

    }

    private void setupChartBugsByImpact() {
        int impactHigh=0, impactMedium=0, impactLow=0;
        if(MainActivity.bugList != null){
            for(int i=0; i< MainActivity.bugList.size();i++) {
                if(MainActivity.bugList.get(i).getImpact().equals("Low")){
                    impactLow++;
                }
                else if(MainActivity.bugList.get(i).getImpact().equals("Medium")){
                    impactMedium++;
                }
                else if(MainActivity.bugList.get(i).getImpact().equals("High")){
                    impactHigh++;
                }

            }

        }

        pieChart_bugsByImpact.addPieSlice(
                new PieModel(
                        "Low",
                        impactLow,
                        Objects.requireNonNull(getActivity()).getResources().getColor(R.color.chart1, null)));

        pieChart_bugsByImpact.addPieSlice(
                new PieModel(
                        "Medium",
                        impactMedium,
                        Objects.requireNonNull(getActivity()).getResources().getColor(R.color.chart2, null)));

        pieChart_bugsByImpact.addPieSlice(
                new PieModel(
                        "High",
                        impactHigh,
                        Objects.requireNonNull(getActivity()).getResources().getColor(R.color.chart3, null)));

        pieChart_bugsByImpact.startAnimation();

    }

    private void setupChartBugsByPriority() {
        int priorityHigh=0, priorityMedium=0, priorityLow=0;
        if(MainActivity.bugList != null){
            for(int i=0; i< MainActivity.bugList.size();i++) {
                if(MainActivity.bugList.get(i).getPriority().equals("Low")){
                    priorityLow++;
                }
                else if(MainActivity.bugList.get(i).getPriority().equals("Medium")){
                    priorityMedium++;
                }
                else if(MainActivity.bugList.get(i).getPriority().equals("High")){
                    priorityHigh++;
                }

            }

        }

        pieChart_bugsByPriority.addPieSlice(
                new PieModel(
                        "Low",
                        priorityLow,
                        Objects.requireNonNull(getActivity()).getResources().getColor(R.color.chart1, null)));

        pieChart_bugsByPriority.addPieSlice(
                new PieModel(
                        "Medium",
                        priorityMedium,
                        Objects.requireNonNull(getActivity()).getResources().getColor(R.color.chart2, null)));

        pieChart_bugsByPriority.addPieSlice(
                new PieModel(
                        "High",
                        priorityHigh,
                        Objects.requireNonNull(getActivity()).getResources().getColor(R.color.chart3, null)));

        pieChart_bugsByPriority.startAnimation();

    }

    private void initializeViews(View view) {
        textView_days = view.findViewById(R.id.textView_daysFromProductStart);
        textView_testers = view.findViewById(R.id.textView_testers);
        textView_developers= view.findViewById(R.id.textView_developers);
        textView_testSuites = view.findViewById(R.id.textView_testSuites);
        textView_rejectedBugs = view.findViewById(R.id.textView_rejectedBugs);

        pieChart_bugsByImpact = view.findViewById(R.id.piechart_bugsByImpact);
        pieChart_bugsByPriority = view.findViewById(R.id.piechart_bugsByPriority);

        barChart_bugsByStatus = view.findViewById(R.id.barchart_bugsByStatus);
    }

    //interfeace that informs Main Activity about an action
    public interface onDashboardFragmentButtonSelected{
        public void onDasboardButtonSelected();
    }
}