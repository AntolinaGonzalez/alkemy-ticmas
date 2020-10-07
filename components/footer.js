import Head from 'next/head'
import Link from 'next/link'
import Container from "react-bootstrap/Container";
export default function Footer() {
  return (
    <div style={{padding:'40px'}}>
      <footer
        className="footer-copyright text-center py-3"
        style={{ position: "fixed", bottom: "0", left:'0', right:'0', background:'white'}}
      >
        <div style={{}}>
          <img
            alt=""
            src="/logoTICMAS.svg"
            width="180px"
            height="30"
            className=""
            style={{ marginLeft: "0" }}
          />
          &copy; {new Date().getFullYear()} Copyright:{" "}
          <a href="https://www.alkemy.org"> Alkemy </a>
        </div>
      </footer>
    </div>
  )
}