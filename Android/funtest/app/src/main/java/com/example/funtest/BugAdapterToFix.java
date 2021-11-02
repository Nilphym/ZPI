package com.example.funtest;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.funtest.objects.Bug;

import java.util.ArrayList;

public class BugAdapterToFix extends RecyclerView.Adapter<BugAdapterToFix.MyViewHolder> {

    private Context mContext;
    private ArrayList<Bug> bugList;


    public BugAdapterToFix(Context context, ArrayList<Bug> bugList) {
        this.mContext = context;
        this.bugList = bugList;
    }

    //methods regarding extending recyvlerview Adapter
    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(mContext).inflate(R.layout.bug_list_item_tofix,parent,false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, @SuppressLint("RecyclerView") int position) {
        holder.bugName.setText(bugList.get(position).getName());
        holder.bugState.setText(bugList.get(position).getState());
        holder.bugImpact.setText(bugList.get(position).getImpact());
        holder.bugPriority.setText(bugList.get(position).getPriority());
        holder.bugDeadline.setText(bugList.get(position).getDeadline());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(mContext, BugDetailsActivityToFix.class);
                intent.putExtra("position",position);
                mContext.startActivity(intent);
            }
        });

    }

    @Override
    public int getItemCount() {
        return this.bugList.size();
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////
    //MyViewHolder that BugAdapter uses
    public class MyViewHolder extends RecyclerView.ViewHolder {

        TextView bugName;
        TextView bugState;
        TextView bugImpact;
        TextView bugPriority;
        TextView bugDeadline;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            bugName = itemView.findViewById(R.id.bil_textView_name);
            bugState = itemView.findViewById(R.id.bil_textView_state);
            bugImpact = itemView.findViewById(R.id.bil_textView_impact);
            bugPriority = itemView.findViewById(R.id.bil_textView_priority);
            bugDeadline = itemView.findViewById(R.id.bil_textView_deadline);

        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
}
