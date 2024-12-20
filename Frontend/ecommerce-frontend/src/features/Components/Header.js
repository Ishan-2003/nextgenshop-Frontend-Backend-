import React from 'react';
import { Navbar, Nav, NavDropdown, Form, Button, FormControl } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { TbCategoryPlus } from "react-icons/tb";
import { useSelector } from 'react-redux';
import ReactFlipCard from 'reactjs-flip-card'

const Header = () => {
    const authstate = useSelector(state=>state.auth);
    const styles = {
        card: {background: 'inherit', color: 'white',width:'inherit',height:'inherit'},
    }
    return (
        <>
            <Navbar expand="lg" className="px-3 header-master-sec">
                <div className="offer">
                    <p>Free Shipping Over $100 & no extra charges</p>
                </div>
                <div className="contact-info">
                    <p>
                        Tollfree : (888) 4322 6001 - (888) 5322 8002
                    </p>
                </div>
            </Navbar>
            <Navbar expand="lg" className="px-3 header-master-main" id='sec-nav'>
                <Navbar.Brand href="#home">
                    <i className="fas fa-store"></i> MyStore
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Form className="d-flex mx-auto w-100 h-25 gap-2 nav-btn-color bs-form">
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success" className='d-flex gap-3'>Search <div><BsSearch className='search' /></div></Button>
                </Form>

                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav>
                        <Nav.Link href="/cart">
                        <ReactFlipCard
            frontStyle={styles.card}
            backStyle={styles.card}
            frontComponent={<i className="fas fa-shopping-cart"></i>}
            backComponent={<i className="fas fa-shopping-cart"></i>}
        />
                            Cart
                        </Nav.Link>
        {authstate?.user===""?
                        (<><Nav.Link href="/login">
                        <ReactFlipCard
            frontStyle={styles.card}
            backStyle={styles.card}
            frontComponent={<i className="fas fa-user"></i>}
            backComponent={<i className="fas fa-user"></i>}
        />
                             Login
                        </Nav.Link>
                        
                        <Nav.Link href="/signup">
                        <ReactFlipCard
            frontStyle={styles.card}
            backStyle={styles.card}
            frontComponent={<i className="fas fa-user"></i>}
            backComponent={<i className="fas fa-user"></i>}
        />
                             Signup
                        </Nav.Link></>):<Nav.Link href="">
                        <ReactFlipCard
            frontStyle={styles.card}
            backStyle={styles.card}
            frontComponent={<i className="fas fa-user"></i>}
            backComponent={<i className="fas fa-user"></i>}
        />
                             Welcome {authstate?.user?.firstname}
                        </Nav.Link>}
                        <Nav.Link href="/wishlist">
                        <ReactFlipCard
            frontStyle={styles.card}
            backStyle={styles.card}
            frontComponent={<i className="fas fa-user"></i>}
            backComponent={<i className="fas fa-user"></i>}
        />
                             Wishlist
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Navbar expand="lg" className="header-master-main third-nav-outer">
                <Nav className="mr-auto" id='third-nav'>
                    <Nav.Link href="/"><TbCategoryPlus size={30}/>
                    </Nav.Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#category/1">Category 1</NavDropdown.Item>
                        <NavDropdown.Item href="#category/2">Category 2</NavDropdown.Item>
                        <NavDropdown.Item href="#category/3">Category 3</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/store">MyStore</Nav.Link>
                    <Nav.Link href="/blog">Blogs</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                </Nav>
            </Navbar>
            
        </>

    );
}

export default Header;
