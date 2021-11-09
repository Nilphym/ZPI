package com.example.funtest;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.TextView;

import com.example.funtest.objects.TestPlan;
import com.example.funtest.objects.TestSuite;

import java.util.ArrayList;

public class TestSuiteAdapterExpandableListView extends BaseExpandableListAdapter {

    private Context mContext;
    private ArrayList<TestSuite> testSuiteList;

    public TestSuiteAdapterExpandableListView(Context mContext, ArrayList<TestSuite> testSuiteList) {
        this.mContext = mContext;
        this.testSuiteList = testSuiteList;
    }

    @Override
    public int getGroupCount() {
        return this.testSuiteList.size();
    }

    @Override
    public int getChildrenCount(int groupPosition) {
        return this.testSuiteList.get(groupPosition).getTests().size();
    }

    @Override
    public Object getGroup(int groupPosition) {
        return this.testSuiteList.get(groupPosition).getCategory();
    }

    @Override
    public Object getChild(int groupPosition, int childPosition) {
        return this.testSuiteList.get(groupPosition).getTests().get(childPosition).getName();
    }

    @Override
    public long getGroupId(int groupPosition) {
        return groupPosition;
    }

    @Override
    public long getChildId(int groupPosition, int childPosition) {
        return childPosition;
    }

    @Override
    public boolean hasStableIds() {
        return false;
    }

    @Override
    public View getGroupView(int groupPosition, boolean isExpanded, View view, ViewGroup viewGroup) {
        String groupName = (String) getGroup(groupPosition);
        if(view == null){
            LayoutInflater layoutInflater = (LayoutInflater) this.mContext.getSystemService(mContext.LAYOUT_INFLATER_SERVICE);
            view = layoutInflater.inflate(R.layout.testsuite_list_item, null);
        }
        TextView textView_groupName = (TextView) view.findViewById(R.id.tsli_name);
        textView_groupName.setText(groupName);
        return view;
    }

    @Override
    public View getChildView(int groupPosition, int childPosition, boolean isExpanded, View view, ViewGroup viewGroup) {
        String childName = (String) getChild(groupPosition,childPosition);
        if(view == null){
            LayoutInflater layoutInflater = (LayoutInflater) this.mContext.getSystemService(mContext.LAYOUT_INFLATER_SERVICE);
            view = layoutInflater.inflate(R.layout.test_list_item, null);
        }
        TextView textView_groupName = (TextView) view.findViewById(R.id.tli_name);
        textView_groupName.setText(childName);
        return view;
    }

    @Override
    public boolean isChildSelectable(int i, int i1) {
        return true;
    }
}
