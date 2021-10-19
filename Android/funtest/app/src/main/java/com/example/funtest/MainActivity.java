package com.example.funtest;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Toast;

import com.example.funtest.fragments.BugsFragment;
import com.example.funtest.fragments.DashboardFragment;
import com.example.funtest.fragments.TestsFragment;
import com.example.funtest.objects.Bug;
import com.google.android.material.navigation.NavigationView;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener, DashboardFragment.onDashboardFragmentButtonSelected {

    //Navigation Drawer
    DrawerLayout drawerLayout;
    ActionBarDrawerToggle actionBarDrawerToggle;
    Toolbar toolbar;
    NavigationView navigationView;

    FragmentManager fragmentManager;
    FragmentTransaction fragmentTransaction;

    //Permissions
    private static final int REQUEST_CODE = 1;

    //item lists
    public static ArrayList<Bug> bugList;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        toolbar = findViewById(R.id.ndt_toolbar);
        setSupportActionBar(toolbar);

        drawerLayout = findViewById(R.id.navigation_drawer);
        navigationView = findViewById(R.id.am_navigation_view);
        navigationView.setNavigationItemSelectedListener(this);

        actionBarDrawerToggle = new ActionBarDrawerToggle(this,drawerLayout,toolbar,R.string.OpenNavigationDrawer,R.string.CloseNavigationDrawer);
        drawerLayout.addDrawerListener(actionBarDrawerToggle);
        actionBarDrawerToggle.setDrawerIndicatorEnabled(true);
        actionBarDrawerToggle.syncState();

        //begin transaction and load default fragment
        fragmentManager = getSupportFragmentManager();
        fragmentTransaction = fragmentManager.beginTransaction();

        fragmentTransaction.add(R.id.mc_frame_layout, new DashboardFragment());
        fragmentTransaction.commit();

        //check necessary permissons
        checkPermissions();

        //DASHBOARD get user stats / If PM: get project stats

        //TESTS get public data

        //BUGS get public data
        getBugList();




    }

    //fetching public bug list from API
    private void getBugList() {
        //CURRENTLY ADDING STATIC DATA
        MainActivity.bugList = new ArrayList<>();
        MainActivity.bugList.add(new Bug("E-12323","Not responding","New","Login","Functional","High","High","1/1/1","12/15/2022","12/20/2022","12/05/2022","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sed risus vel iaculis. Phasellus imperdiet velit a rhoncus dignissim. Vivamus blandit fringilla ligula, et eleifend nisl imperdiet cursus. Nullam non lobortis risus. Integer sollicitudin mattis neque, eget imperdiet mauris maximus vitae. Praesent fringilla, nisl eget dictum maximus, sapien odio sodales magna, et finibus dolor massa in turpis. Donec enim felis, suscipit malesuada libero vitae, lacinia efficitur enim."));
        MainActivity.bugList.add(new Bug("E-12324","Table not visible","New","Register","Functional","Medium","Low","1/1/1","12/15/2022","12/20/2022","12/05/2022","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sed risus vel iaculis. Phasellus imperdiet velit a rhoncus dignissim. Vivamus blandit fringilla ligula, et eleifend nisl imperdiet cursus. Nullam non lobortis risus. Integer sollicitudin mattis neque, eget imperdiet mauris maximus vitae. Praesent fringilla, nisl eget dictum maximus, sapien odio sodales magna, et finibus dolor massa in turpis. Donec enim felis, suscipit malesuada libero vitae, lacinia efficitur enim."));
        MainActivity.bugList.add(new Bug("E-12325","Button not responding","New","Add to basket","Functional","High","Medium","1/1/1","12/15/2022","12/20/2022","12/05/2022","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sed risus vel iaculis. Phasellus imperdiet velit a rhoncus dignissim. Vivamus blandit fringilla ligula, et eleifend nisl imperdiet cursus. Nullam non lobortis risus. Integer sollicitudin mattis neque, eget imperdiet mauris maximus vitae. Praesent fringilla, nisl eget dictum maximus, sapien odio sodales magna, et finibus dolor massa in turpis. Donec enim felis, suscipit malesuada libero vitae, lacinia efficitur enim."));
        MainActivity.bugList.add(new Bug("E-12326","Screen Freezes","New","Refresh page","Functional","Low","Low","1/1/1","12/15/2022","12/20/2022","12/05/2022","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sed risus vel iaculis. Phasellus imperdiet velit a rhoncus dignissim. Vivamus blandit fringilla ligula, et eleifend nisl imperdiet cursus. Nullam non lobortis risus. Integer sollicitudin mattis neque, eget imperdiet mauris maximus vitae. Praesent fringilla, nisl eget dictum maximus, sapien odio sodales magna, et finibus dolor massa in turpis. Donec enim felis, suscipit malesuada libero vitae, lacinia efficitur enim."));
        MainActivity.bugList.add(new Bug("E-12327","Screen not responding","New","Refresh page","Functional","Low","Low","1/1/1","12/15/2022","12/20/2022","12/05/2022","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sed risus vel iaculis. Phasellus imperdiet velit a rhoncus dignissim. Vivamus blandit fringilla ligula, et eleifend nisl imperdiet cursus. Nullam non lobortis risus. Integer sollicitudin mattis neque, eget imperdiet mauris maximus vitae. Praesent fringilla, nisl eget dictum maximus, sapien odio sodales magna, et finibus dolor massa in turpis. Donec enim felis, suscipit malesuada libero vitae, lacinia efficitur enim."));
        //
    }


    //PERMISSIONS LOGIC
    private void checkPermissions() {
        if(ContextCompat.checkSelfPermission(getApplicationContext(), Manifest.permission.WRITE_EXTERNAL_STORAGE)!= PackageManager.PERMISSION_GRANTED){
            ActivityCompat.requestPermissions(MainActivity.this,new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},REQUEST_CODE);
        }

    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if(requestCode == REQUEST_CODE){
            if(grantResults[0] != PackageManager.PERMISSION_GRANTED){
                ActivityCompat.requestPermissions(MainActivity.this,new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},REQUEST_CODE);

            }

        }
    }

    //NAVIGATION DRAWER LOGIC
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {

        drawerLayout.closeDrawer(GravityCompat.START);

        if(item.getItemId() == R.id.menu_item_dashboard){
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            fragmentTransaction.replace(R.id.mc_frame_layout, new DashboardFragment());
            fragmentTransaction.commit();

        }
        else if(item.getItemId() == R.id.menu_item_tests){
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            fragmentTransaction.replace(R.id.mc_frame_layout, new TestsFragment());
            fragmentTransaction.commit();

        }
        else if(item.getItemId() == R.id.menu_item_bugs){
            fragmentManager = getSupportFragmentManager();
            fragmentTransaction = fragmentManager.beginTransaction();
            fragmentTransaction.replace(R.id.mc_frame_layout, new BugsFragment());
            fragmentTransaction.commit();

        }
        else if(item.getItemId() == R.id.menu_item_logout){

        }
        return true;
    }
    //DASHBOARD FRAGMENT ACTIONS REACTIONS
    @Override
    public void onDasboardButtonSelected() {
        Toast.makeText(getApplicationContext(), "PM Reports Button", Toast.LENGTH_SHORT).show();

    }
    ////////////////////////////
}