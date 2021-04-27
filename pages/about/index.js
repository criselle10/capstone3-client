import React from 'react';
import styles from './about.module.css';
import {Jumbotron, Form, Row, Col} from 'react-bootstrap';

export default function About(){
    return (
        <>
            <Jumbotron className={styles.about}>
                <Form.Row>
                    <Form.Group as={Col} className={styles.devpic}>
                        <img src='/crisel.jpg' alt="me" className={styles.picture} />
                        <h4 className={styles.myname}>Criselle A. Albor</h4>
                        <h6 className={styles.mytitle}>Full Stack Developer</h6>
					</Form.Group>
				</Form.Row>
                <h1 className={styles.title}>-- MNY Tracker --</h1>
                <div className={styles.abouttext}>

                            <p>The MNY Tracker application is an income and expense tracker that you can use for managing and monitoring your budget.
                            </p>
                            <p>I built this application as my capstone project 3 in bootcamp training. </p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nullam vehicula ipsum a arcu cursus vitae congue mauris. Convallis convallis tellus id interdum velit laoreet id donec. Et magnis dis parturient montes nascetur ridiculus mus. Facilisis mauris sit amet massa vitae tortor. Massa tincidunt dui ut ornare lectus sit amet. Habitasse platea dictumst vestibulum rhoncus. Maecenas sed enim ut sem viverra aliquet eget. Fermentum leo vel orci porta non. Ut placerat orci nulla pellentesque dignissim enim sit amet. Orci eu lobortis elementum nibh tellus molestie. Consectetur adipiscing elit ut aliquam purus sit amet luctus. Mi in nulla posuere sollicitudin aliquam. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam. Feugiat in fermentum posuere urna nec. Accumsan sit amet nulla facilisi morbi. Risus sed vulputate odio ut enim blandit volutpat. Elementum tempus egestas sed sed risus. Nisi porta lorem mollis aliquam ut porttitor. Ridiculus mus mauris vitae ultricies leo integer malesuada. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Et malesuada fames ac turpis. Elementum nisi quis eleifend quam adipiscing vitae. Eleifend mi in nulla posuere. Montes nascetur ridiculus mus mauris vitae ultricies leo integer. Amet est placerat in egestas erat imperdiet. Dictum varius duis at consectetur. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Dignissim diam quis enim lobortis scelerisque fermentum dui. Luctus accumsan tortor posuere ac ut consequat semper viverra nam. Fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Turpis nunc eget lorem dolor. Varius duis at consectetur lorem donec massa sapien faucibus. Ornare suspendisse sed nisi lacus sed viverra. Magnis dis parturient montes nascetur ridiculus mus mauris. Gravida rutrum quisque non tellus.
                            </p>
                        </div>
               
                
            </Jumbotron>
            <footer className={styles.footer} fluid='true'>
				<p className={styles.mny}>mnyTracker</p> <p> &copy; 2021 All Rights Reserved</p>
			</footer>
        </>
    )
}