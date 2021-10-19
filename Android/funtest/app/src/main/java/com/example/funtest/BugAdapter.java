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

import com.bumptech.glide.Glide;
import com.example.funtest.objects.Bug;

import java.util.ArrayList;

public class BugAdapter extends RecyclerView.Adapter<BugAdapter.MyViewHolder> {

    private Context mContext;
    private ArrayList<Bug> bugList;


    public BugAdapter(Context context, ArrayList<Bug> bugList) {
        this.mContext = context;
        this.bugList = bugList;
    }

    //methods regarding extending recyvlerview Adapter
    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(mContext).inflate(R.layout.bug_list_item,parent,false);
        return new MyViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, @SuppressLint("RecyclerView") int position) {
        holder.bugCode.setText(bugList.get(position).getCode());
        holder.bugName.setText(bugList.get(position).getName());
        holder.bugState.setText(bugList.get(position).getState());
        holder.bugType.setText(bugList.get(position).getType());
        holder.bugImpact.setText(bugList.get(position).getImpact());
        holder.bugPriority.setText(bugList.get(position).getPriority());
        holder.bugFunctionality.setText(bugList.get(position).getFunctionality());
        holder.bugExecs.setText(bugList.get(position).getExecs());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(mContext, BugDetailsActivity.class);
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

        TextView bugCode;
        TextView bugName;
        TextView bugState;
        TextView bugType;
        TextView bugImpact;
        TextView bugPriority;
        TextView bugFunctionality;
        TextView bugExecs;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            bugCode = itemView.findViewById(R.id.bil_textView_code);
            bugName = itemView.findViewById(R.id.bil_textView_name);
            bugState = itemView.findViewById(R.id.bil_textView_state);
            bugType = itemView.findViewById(R.id.bil_textView_type);
            bugImpact = itemView.findViewById(R.id.bil_textView_impact);
            bugPriority = itemView.findViewById(R.id.bil_textView_priority);
            bugFunctionality = itemView.findViewById(R.id.bil_textView_functionality);
            bugExecs = itemView.findViewById(R.id.bil_textView_execs);

        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
}
