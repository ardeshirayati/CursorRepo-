package com.example.application.views;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;

@Route("")
public class MainView extends VerticalLayout {
	public MainView() {
		H1 title = new H1("Salam, Vaadin Flow!");
		TextField name = new TextField("Name");
		Button greet = new Button("Greet", e -> add(new H1("Salam, " + name.getValue() + "!")));
		add(title, name, greet);
	}
}