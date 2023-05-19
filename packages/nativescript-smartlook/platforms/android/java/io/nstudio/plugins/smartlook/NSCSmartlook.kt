package io.nstudio.plugins.smartlook

import android.view.View;
import com.smartlook.android.core.api.*;
import com.smartlook.android.core.api.model.*;
import com.smartlook.android.core.video.annotation.*;
import com.smartlook.android.core.api.extension.*;

class NSCSmartlook {

    companion object {
        @JvmStatic
        fun start(key: String) {
            Smartlook.instance.preferences.projectKey = key
            Smartlook.instance.start()
        }

        @JvmStatic
        fun stop() {
            Smartlook.instance.stop()
        }

        @JvmStatic
        fun isRecording(): Boolean {
            return Smartlook.instance.state.status.isRecording
        }

        @JvmStatic
        fun sessionUrl(withTimestamp: Boolean): String {
            if (withTimestamp) {
                return Smartlook.instance.user.session.urlWithTimestamp.toString()
            } else {
                return Smartlook.instance.user.session.url.toString()
            }
        }

        @JvmStatic
        fun setRenderingMode(mode: Int) {
            when (mode) {
                0 -> Smartlook.instance.preferences.renderingMode = RenderingMode.NATIVE
                1 -> Smartlook.instance.preferences.renderingMode = RenderingMode.WIREFRAME
                2 -> Smartlook.instance.preferences.renderingMode = RenderingMode.NO_RENDERING
            }
        }

        @JvmStatic
        fun getRenderingMode(): Int {
            when (Smartlook.instance.state.renderingMode) {
                RenderingMode.NATIVE -> return 0
                RenderingMode.WIREFRAME -> return 1
                RenderingMode.NO_RENDERING -> return 2
            }
        }

        @JvmStatic
        fun setSensitivity(view: View, sensitive: Boolean) {
            view.isSensitive = sensitive
        }

        @JvmStatic
        fun setUser(id: String, name: String?, email: String?, extraData: HashMap<String, String>?) {
            Smartlook.instance.user.identifier = id
            if (name != null) {
                Smartlook.instance.user.name = name
            }
            if (email != null) {
                Smartlook.instance.user.email = email
            }
            if (extraData != null) {
                for (prop in extraData) {
                    Smartlook.instance.user.properties.putString(prop.key, prop.value)
                }
            }
        }
    }
}

