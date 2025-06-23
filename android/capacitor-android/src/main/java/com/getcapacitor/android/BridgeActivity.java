package com.getcapacitor.android;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.getcapacitor.Bridge;

public class BridgeActivity extends AppCompatActivity {

  protected Bridge bridge;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    this.bridge = new Bridge(this, savedInstanceState, null);
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    if (bridge != null) {
      bridge.onNewIntent(intent);
    }
  }

  @Override
  protected void onStart() {
    super.onStart();
    if (bridge != null) {
      bridge.onStart();
    }
  }

  @Override
  protected void onResume() {
    super.onResume();
    if (bridge != null) {
      bridge.onResume();
    }
  }

  @Override
  protected void onPause() {
    super.onPause();
    if (bridge != null) {
      bridge.onPause();
    }
  }

  @Override
  protected void onStop() {
    super.onStop();
    if (bridge != null) {
      bridge.onStop();
    }
  }

  @Override
  protected void onDestroy() {
    super.onDestroy();
    if (bridge != null) {
      bridge.onDestroy();
    }
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    if (bridge != null) {
      bridge.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }
  }

  @Override
  protected void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (bridge != null) {
      bridge.onActivityResult(requestCode, resultCode, data);
    }
  }

  @Override
  public void onSaveInstanceState(Bundle outState) {
    super.onSaveInstanceState(outState);
    if (bridge != null) {
      bridge.onSaveInstanceState(outState);
    }
  }

  @Override
  public void onConfigurationChanged(android.content.res.Configuration newConfig) {
    super.onConfigurationChanged(newConfig);
    if (bridge != null) {
      bridge.onConfigurationChanged(newConfig);
    }
  }
}