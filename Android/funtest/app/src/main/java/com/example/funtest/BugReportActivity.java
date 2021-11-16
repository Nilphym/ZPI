package com.example.funtest;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.app.DatePickerDialog;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.Spinner;
import android.widget.TextView;

import com.example.funtest.utils.ListViewUtils;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

import java.io.FileNotFoundException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Locale;

public class BugReportActivity extends AppCompatActivity {

    EditText editText_name, editText_description, editText_deadline;
    Spinner spinner_type, spinner_impact, spinner_priority;
    ListView listView_attachments;
    Button button_selectAttachments, button_deleteAttachment;
    FloatingActionButton fab_report, fab_cancel;

    ArrayList<Bitmap> attachmentsBitMap;
    public static final int PICK_IMAGE = 1;

    ArrayList<String> labels_type;
    ArrayList<String> labels_impact;
    ArrayList<String> labels_priority;

    final Calendar myCalendar = Calendar.getInstance();

    private String testId;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bug_report);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();

        initializeViews();
        get_testId();

        //initialize spinner lists
        labels_type = new ArrayList<>();
        labels_type.add("Functional");
        labels_type.add("Logical");
        labels_type.add("Wrong Datatype");

        labels_impact = new ArrayList<>();
        labels_impact.add("High");
        labels_impact.add("Medium");
        labels_impact.add("Low");

        labels_priority = new ArrayList<>();
        labels_priority.add("High");
        labels_priority.add("Medium");
        labels_priority.add("Low");

        //initialize bitmap list
        attachmentsBitMap = new ArrayList<>();

        //initialize calendar date picker

        DatePickerDialog.OnDateSetListener date = new DatePickerDialog.OnDateSetListener() {

            @Override
            public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
                // TODO Auto-generated method stub
                myCalendar.set(Calendar.YEAR, year);
                myCalendar.set(Calendar.MONTH, monthOfYear);
                myCalendar.set(Calendar.DAY_OF_MONTH, dayOfMonth);
                updateDeadlineLabel();
            }

        };

        editText_deadline.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                // TODO Auto-generated method stub
                new DatePickerDialog(BugReportActivity.this, date, myCalendar
                        .get(Calendar.YEAR), myCalendar.get(Calendar.MONTH),
                        myCalendar.get(Calendar.DAY_OF_MONTH)).show();
            }
        });

        //initialize spinners
        ArrayAdapter<String> adapter_type = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_dropdown_item, labels_type);
        spinner_type.setAdapter(adapter_type);
        ArrayAdapter<String> adapter_impact = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_dropdown_item, labels_impact);
        spinner_impact.setAdapter(adapter_impact);
        ArrayAdapter<String> adapter_priority = new ArrayAdapter<String>(this, android.R.layout.simple_spinner_dropdown_item, labels_priority);
        spinner_priority.setAdapter(adapter_priority);

        //initialize attachments buttons
        button_selectAttachments.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, "Select Picture"), PICK_IMAGE);
            }
        });
        button_deleteAttachment.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(attachmentsBitMap.size()>0){
                    attachmentsBitMap.remove((attachmentsBitMap.size()-1));
                    refreshAttachmentsList();
                }
            }
        });

        //initialize attachments listview
        refreshAttachmentsList();


    }

    private void initializeViews() {
        editText_name = findViewById(R.id.br_editText_name);
        editText_description = findViewById(R.id.br_editText_description);
        editText_deadline = findViewById(R.id.br_editText_deadline);

        spinner_type = findViewById(R.id.br_spinner_type);
        spinner_impact = findViewById(R.id.br_spinner_impact);
        spinner_priority = findViewById(R.id.br_spinner_priority);

        listView_attachments = findViewById(R.id.br_listView_attachments);

        button_selectAttachments = findViewById(R.id.br_button_selectattachments);
        button_deleteAttachment = findViewById(R.id.br_button_deselectattachments);
        fab_report = findViewById(R.id.br_fab_report);
        fab_cancel = findViewById(R.id.br_fab_cancel);
    }

    private void get_testId() {

        testId = getIntent().getStringExtra("id");

    }

    private void updateDeadlineLabel() {
        String myFormat = "dd/MM/yy"; //In which you need put here
        SimpleDateFormat sdf = new SimpleDateFormat(myFormat, Locale.UK);

        editText_deadline.setText(sdf.format(myCalendar.getTime()));
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE) {
            if (data == null) {
                //Display an error
                return;
            }
            try {
                InputStream inputStream = getApplicationContext().getContentResolver().openInputStream(data.getData());
                Bitmap selectedImage = BitmapFactory.decodeStream(inputStream);
                attachmentsBitMap.add(selectedImage);
                refreshAttachmentsList();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            }

        }
    }

    private void refreshAttachmentsList() {
        ArrayList<String> attachmentsLabels = new ArrayList<>();
        for(int i=0;i< attachmentsBitMap.size();i++){
            attachmentsLabels.add("Attachment "+ (i+1));
        }
        ArrayAdapter<String> entryDataAdapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, attachmentsLabels);
        listView_attachments.setAdapter(entryDataAdapter);
        ListViewUtils.setListViewHeightBasedOnChildren(listView_attachments);


    }
}