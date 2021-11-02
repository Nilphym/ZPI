package com.example.funtest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.example.funtest.objects.Bug;

import java.util.ArrayList;

public class BugDetailsActivityToReview extends AppCompatActivity {

    TextView textView_name, textView_state, textView_functionality, textView_type, textView_impact, textView_priority, textView_retestsRequired, textView_retestsDone, textView_retestsFailed, textView_deadline, textView_reportDate, textView_endDate, textView_description;

    Button button_bugAttachments, button_execute;

    public static ArrayList<Bug> currentBugList = MainActivity.bugList;
    int bug_list_position = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bug_details_to_review);

        initializeViews();
        get_position();

        //setting textviews in layout with current bug details
        textView_name.setText(currentBugList.get(bug_list_position).getName());
        textView_state.setText(currentBugList.get(bug_list_position).getState());
        textView_functionality.setText(currentBugList.get(bug_list_position).getFunctionality());
        textView_type.setText(currentBugList.get(bug_list_position).getType());
        textView_impact.setText(currentBugList.get(bug_list_position).getImpact());
        textView_priority.setText(currentBugList.get(bug_list_position).getPriority());

        String retestsRequired = String.valueOf(currentBugList.get(bug_list_position).getRetestsRequired());
        String retestsDone = String.valueOf(currentBugList.get(bug_list_position).getRetestsDone());
        String retestsFailed = String.valueOf(currentBugList.get(bug_list_position).getRetestsFailed());
        textView_retestsRequired.setText(retestsRequired);
        textView_retestsDone.setText(retestsDone);
        textView_retestsFailed.setText(retestsFailed);

        textView_deadline.setText(currentBugList.get(bug_list_position).getDeadline());
        textView_reportDate.setText(currentBugList.get(bug_list_position).getReportDate());
        textView_endDate.setText(currentBugList.get(bug_list_position).getEndDate());
        textView_description.setText(currentBugList.get(bug_list_position).getDescription());

        button_bugAttachments.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), BugDetailsAttachmentsActivity.class);
                intent.putExtra("position",bug_list_position);
                intent.putExtra("sourceActivityName","BugDetailsActivityToReview");
                startActivity(intent);
            }
        });

        button_execute.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(getApplicationContext(), "Execute Button", Toast.LENGTH_SHORT).show();
                //Intent intent = new Intent(getApplicationContext(), BugDetailsAttachmentsActivity.class);
                //intent.putExtra("position",bug_list_position);
                //intent.putExtra("sourceActivityName","BugDetailsActivity");
                //startActivity(intent);
            }
        });
    }

    private void get_position() {

        bug_list_position = getIntent().getIntExtra("position",-1);

    }

    private void initializeViews() {
        textView_name = findViewById(R.id.bd_textView_name);
        textView_name.setSelected(true);
        textView_state = findViewById(R.id.bd_textView_state);
        textView_state.setSelected(true);
        textView_functionality = findViewById(R.id.bd_textView_functionality);
        textView_functionality.setSelected(true);
        textView_type = findViewById(R.id.bd_textView_type);
        textView_type.setSelected(true);
        textView_impact = findViewById(R.id.bd_textView_impact);
        textView_impact.setSelected(true);
        textView_priority = findViewById(R.id.bd_textView_priority);
        textView_priority.setSelected(true);
        textView_retestsRequired = findViewById(R.id.bd_textView_retestsRequired);
        textView_retestsRequired.setSelected(true);
        textView_retestsDone = findViewById(R.id.bd_textView_retestsDone);
        textView_retestsDone.setSelected(true);
        textView_retestsFailed = findViewById(R.id.bd_textView_retestsFailed);
        textView_retestsFailed.setSelected(true);
        textView_deadline = findViewById(R.id.bd_textView_deadline);
        textView_deadline.setSelected(true);
        textView_reportDate = findViewById(R.id.bd_textView_reportDate);
        textView_reportDate.setSelected(true);
        textView_endDate = findViewById(R.id.bd_textView_endDate);
        textView_endDate.setSelected(true);
        textView_description = findViewById(R.id.bd_textView_description);

        button_bugAttachments = findViewById(R.id.bd_button_attachments);
        button_execute = findViewById(R.id.bd_button_execute);




    }
}