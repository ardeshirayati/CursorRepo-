package org.pdr.cbaas.sbank.ui;

import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.page.AppShellConfigurator;
import com.vaadin.flow.server.PWA;
import com.vaadin.flow.theme.Theme;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Theme(value = "skeleton-starter-hilla-react")
@PWA(name = "cbaas.sbank.ui", shortName = "sbank", offlinePath = "offline.html", offlineResources = {"images/icons/icon.png"})
public class Application implements AppShellConfigurator {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}