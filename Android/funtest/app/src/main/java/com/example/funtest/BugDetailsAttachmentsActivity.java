package com.example.funtest;

import androidx.appcompat.app.ActionBar;
import androidx.appcompat.app.AppCompatActivity;

import android.database.Cursor;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.provider.MediaStore;
import android.util.Base64;
import android.util.Log;
import android.widget.ImageView;

import com.example.funtest.objects.Bug;
import com.synnapps.carouselview.CarouselView;
import com.synnapps.carouselview.ImageListener;

import java.io.File;
import java.util.ArrayList;

public class BugDetailsAttachmentsActivity extends AppCompatActivity {

    private ArrayList<Bug> currentBugList;
    int bug_list_position = -1;
    private ArrayList<String> attachments= new ArrayList<>();
    private ArrayList<Bitmap> attachmentsBitMap = new ArrayList<>();


    CarouselView carouselView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bug_details_attachments);

        ActionBar actionBar = getSupportActionBar();
        actionBar.hide();
        initializeViews();
        get_position();

        //checking which activity started this activity and setting proper list of bugs
        String sourceActivityName = getIntent().getStringExtra("sourceActivityName");
        if(sourceActivityName.equals("BugDetailsActivity")){
            currentBugList = MainActivity.bugList;
        }




        //getting attachments list of selected bug
        attachments = currentBugList.get(bug_list_position).getAttachments();

        getImages();
        /*
        //getting list of attachments as bitmap
        for(int i = 0; i < attachments.size();i++){
            byte[] currentDecodedString = Base64.decode(attachments.get(i), Base64.DEFAULT);
            Bitmap currentDecodedImage = BitmapFactory.decodeByteArray(currentDecodedString, 0, currentDecodedString.length);
            attachmentsBitMap.add(currentDecodedImage);
        }

         */

        //setting up a carousel view
        carouselView.setPageCount(attachmentsBitMap.size());

        carouselView.setImageListener(new ImageListener() {
            @Override
            public void setImageForPosition(int position, ImageView imageView) {
                imageView.setImageBitmap(attachmentsBitMap.get(position));
            }
        });
    }

    private void getImages() {
        // Find the last picture
        String[] projection = new String[]{
                MediaStore.Images.ImageColumns._ID,
                MediaStore.Images.ImageColumns.DATA,
                MediaStore.Images.ImageColumns.BUCKET_DISPLAY_NAME,
                MediaStore.Images.ImageColumns.DATE_TAKEN,
                MediaStore.Images.ImageColumns.MIME_TYPE
        };
        final Cursor cursor = this.getApplicationContext().getContentResolver().query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, projection, null,
                        null, MediaStore.Images.ImageColumns.DATE_TAKEN + " DESC");

        // Put it in the image view
        if (cursor.moveToFirst()) {
            String imageLocation = cursor.getString(1);
            File imageFile = new File(imageLocation);
            if (imageFile.exists()) {   // TODO: is there a better way to do this?
                Bitmap bm = BitmapFactory.decodeFile(imageLocation);
                attachmentsBitMap.add(bm);

            }
            int numberOfExtraPhotos=2;
            int i=0;
            while (cursor.moveToNext() && i<numberOfExtraPhotos){
                imageLocation = cursor.getString(1);
                imageFile = new File(imageLocation);
                if (imageFile.exists()) {   // TODO: is there a better way to do this?
                    Bitmap bm = BitmapFactory.decodeFile(imageLocation);
                    attachmentsBitMap.add(bm);

                }
                i++;
            }
        }

    }

    private void get_position() {

        bug_list_position = getIntent().getIntExtra("position",-1);

    }

    private void initializeViews() {
        carouselView = (CarouselView) findViewById(R.id.carouselView);

    }
}