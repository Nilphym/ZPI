package com.example.funtest;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.funtest.objects.TestPlan;

import java.util.ArrayList;

public class TestPlanAdapter extends RecyclerView.Adapter<TestPlanAdapter.MyViewHolder> {

    private Context mContext;
    private ArrayList<TestPlan> testPlanList;


    public TestPlanAdapter(Context mContext, ArrayList<TestPlan> testPlanList) {
        this.mContext = mContext;
        this.testPlanList = testPlanList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(mContext).inflate(R.layout.testplan_list_item,parent,false);
        return new TestPlanAdapter.MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.testPlanName.setText(testPlanList.get(position).getName());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(mContext, TestPlanDetailsActivity.class);
                intent.putExtra("position",position);
                intent.putExtra("id",testPlanList.get(position).getId());
                mContext.startActivity(intent);
            }
        });

    }

    @Override
    public int getItemCount() {
        return this.testPlanList.size();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //MyViewHolder that TestPlanAdapter uses
    public class MyViewHolder extends RecyclerView.ViewHolder {

        TextView testPlanName;


        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            testPlanName = itemView.findViewById(R.id.tpil_textView_name);


        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
}
