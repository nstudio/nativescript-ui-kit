package io.nstudio.plugins.smartlook

import android.view.View
import com.smartlook.android.core.api.Smartlook
import com.smartlook.android.core.api.extension.isSensitive
import com.smartlook.android.core.video.annotation.RenderingMode
import com.smartlook.android.core.api.model.Properties

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
          return if (withTimestamp) {
            Smartlook.instance.user.session.urlWithTimestamp.toString()
          } else {
            Smartlook.instance.user.session.url.toString()
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


/*
// todo
        @JvmStatic
        fun getRenderingMode(): Int {
            return when (Smartlook.instance.state.renderingMode) {
                RenderingMode.NATIVE -> 0
                RenderingMode.WIREFRAME -> 1
                RenderingMode.NO_RENDERING -> 2
            }
        }
*/


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

        @JvmStatic
        fun trackEventProperties(eventName: String, mapProperties: HashMap<String, String>?) {
            val properties = propertiesFromMap(mapProperties)

            Smartlook.instance.trackEvent(eventName, properties)
        }

        @JvmStatic
        fun trackNavigationEvent(screenName: String, mapProperties: HashMap<String, String>?) {
            val properties = propertiesFromMap(mapProperties)

            Smartlook.instance.trackNavigationEnter(screenName, properties)
        }

        private fun propertiesFromMap(propertiesMap: HashMap<String, String>?): Properties? {
            if (propertiesMap == null) {
                return null
            }

            val properties = Properties()

            for (prop in propertiesMap) {
                properties.putString(prop.key, prop.value)
            }

            return properties
        }
    }
}
