# StreamPulse TV - Android Studio APK Building Guide 📱📺

Yes! You can easily build both an **Android Mobile App (.apk)** and an **Android TV App (.apk)** in **Android Studio** using this exact website code.

---

## 🛠️ Method 1: Android Studio WebView (Recommended & Easiest)

### Step 1: Open Android Studio
1. Open **Android Studio** -> Click **New Project**.
2. Select **Empty Views Activity** (or **Android TV Activity** for Smart TV) -> Click **Next**.
3. Name your app: `StreamPulse TV` -> Language: **Java** or **Kotlin** -> Click **Finish**.

---

### Step 2: Update `AndroidManifest.xml`
Open `app/src/main/AndroidManifest.xml` and add **Internet permissions** and **Hardware Acceleration**:

```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.streampulse.tv">

    <!-- Internet & Network Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />

    <!-- Optional: Android TV D-Pad Remote Support -->
    <uses-feature android:name="android.hardware.touchscreen" android:required="false" />
    <uses-feature android:name="android.software.leanback" android:required="false" />

    <application
        android:allowBackup="true"
        android:hardwareAccelerated="true"
        android:icon="@mipmap/ic_launcher"
        android:label="StreamPulse TV"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.NoActionBar">
        
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
                <!-- Category for Android TV Home Screen -->
                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

---

### Step 3: Update `activity_main.xml`
Open `app/src/main/res/layout/activity_main.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#050811">

    <WebView
        android:id="@+id/webView"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</RelativeLayout>
```

---

### Step 4: Update `MainActivity.kt` (Kotlin)
Open `app/src/main/java/com/streampulse/tv/MainActivity.kt` and paste this Kotlin code:

```kotlin
package com.streampulse.tv

import android.os.Bundle
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        webView = findViewById(R.id.webView)

        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true
        webSettings.allowFileAccess = true
        webSettings.allowContentAccess = true
        webSettings.mediaPlaybackRequiresUserGesture = false
        webSettings.mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW

        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()

        // Option 1: Load live hosted URL
        webView.loadUrl("https://your-streampulse-app.vercel.app")

        // Option 2: Or load offline files from assets
        // webView.loadUrl("file:///android_asset/index.html")
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
```

---

### Step 4 (Alternative): `MainActivity.java` (Java)
If using Java, open `MainActivity.java`:

```java
package com.streampulse.tv;

import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);

        webView.setWebViewClient(new WebViewClient());
        webView.setWebChromeClient(new WebChromeClient());

        webView.loadUrl("https://your-streampulse-app.vercel.app");
    }
}
```

---

### Step 5: Build APK in Android Studio
1. In Android Studio top menu -> Click **Build**.
2. Select **Build Bundle(s) / APK(s)** -> **Build APK(s)**.
3. Your **`app-debug.apk`** is generated! You can install this APK on any Android Phone, Tablet, or Smart TV! 🚀

---

## ⚡ Method 2: Offline Assets Mode (No Server Required)
If you want the app to run offline without hosting:
1. In Android Studio, right click `app/src/main` -> **New** -> **Folder** -> **Assets Folder**.
2. Copy all files (`index.html`, `styles.css`, `app.js`, `channels.js`) into `app/src/main/assets/`.
3. In `MainActivity.java`, use: `webView.loadUrl("file:///android_asset/index.html");`.
