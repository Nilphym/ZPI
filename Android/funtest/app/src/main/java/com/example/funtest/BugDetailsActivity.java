package com.example.funtest;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.example.funtest.objects.Bug;

import java.util.ArrayList;

public class BugDetailsActivity extends AppCompatActivity {

    TextView textView_name, textView_state, textView_functionality, textView_type, textView_impact, textView_priority, textView_execs, textView_deadline, textView_reportDate, textView_endDate, textView_description;

    Button button_bugAttachments;

    public static ArrayList<Bug> currentBugList = MainActivity.bugList;
    int bug_list_position = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bug_details);


        initializeViews();
        get_position();

        //setting textviews in layout with current bug details
        textView_name.setText(currentBugList.get(bug_list_position).getName());
        textView_state.setText(currentBugList.get(bug_list_position).getState());
        textView_functionality.setText(currentBugList.get(bug_list_position).getFunctionality());
        textView_type.setText(currentBugList.get(bug_list_position).getType());
        textView_impact.setText(currentBugList.get(bug_list_position).getImpact());
        textView_priority.setText(currentBugList.get(bug_list_position).getPriority());
        String currentExecs = currentBugList.get(bug_list_position).getRetestsRequired() + "/" + currentBugList.get(bug_list_position).getRetestsDone() + "/" + currentBugList.get(bug_list_position).getRetestsFailed();
        textView_execs.setText(currentExecs);
        textView_deadline.setText(currentBugList.get(bug_list_position).getDeadline());
        textView_reportDate.setText(currentBugList.get(bug_list_position).getReportDate());
        textView_endDate.setText(currentBugList.get(bug_list_position).getEndDate());
        textView_description.setText(currentBugList.get(bug_list_position).getDescription());

        button_bugAttachments.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), BugDetailsAttachmentsActivity.class);
                intent.putExtra("position",bug_list_position);
                intent.putExtra("sourceActivityName","BugDetailsActivity");
                startActivity(intent);
            }
        });

    }

    private void get_position() {

        bug_list_position = getIntent().getIntExtra("position",-1);

    }

    private void initializeViews() {
        textView_name = findViewById(R.id.bd_textView_name);
        textView_state = findViewById(R.id.bd_textView_state);
        textView_functionality = findViewById(R.id.bd_textView_functionality);
        textView_type = findViewById(R.id.bd_textView_type);
        textView_impact = findViewById(R.id.bd_textView_impact);
        textView_priority = findViewById(R.id.bd_textView_priority);
        textView_execs = findViewById(R.id.bd_textView_execs);
        textView_deadline = findViewById(R.id.bd_textView_deadline);
        textView_reportDate = findViewById(R.id.bd_textView_reprtDate);
        textView_endDate = findViewById(R.id.bd_textView_endDate);
        textView_description = findViewById(R.id.bd_textView_description);

        button_bugAttachments = findViewById(R.id.bd_button_attachments);




    }
}