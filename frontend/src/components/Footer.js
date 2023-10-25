import React from 'react'
import { Link } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

function Footer() {
  return (
    <div className='container-fluid bg-dark text-light text-decoration-none'>
      <div className='row mt-1 justify-content-center ms-auto'>
        <hr />
        <div className='col-lg-3 col-md-4 col-sm-12 '>
          <h4> About EEP </h4>
          <p>In et sunt officia est elit do exercitation ut non incididunt dolor. Ex magna deserunt officia sunt dolore eiusmod culpa aliquip et laborum laborum anim commodo aute. Anim enim magna nisi mollit consequat ea nisi qui adipisicing est nisi incididunt ex. Nostrud exercitation irure officia esse mollit ipsum. Sunt ipsum elit et incididunt et sunt ea culpa in eiusmod ullamco. In duis enim non sit consectetur deserunt anim voluptate non.</p>
          <p>Aliqua cillum eiusmod nisi nulla quis eiusmod elit laborum adipisicing. Sit elit cupidatat duis id irure eu voluptate commodo velit elit cillum. Lorem sunt tempor esse nostrud nisi ea anim voluptate ipsum elit do sunt. Reprehenderit eu sint elit aliqua cillum aliquip id ut adipisicing laboris voluptate esse nostrud. Eiusmod in elit laborum commodo sit anim.</p>
        </div>
        <div className='col-lg-3 col-md-4 col-sm-12 '>
          <h4> Vacancy </h4>
          <p>Eiusmod ad cupidatat ullamco sint officia nostrud consectetur ad. Id et Lorem duis officia tempor aliquip tempor. Lorem culpa officia reprehenderit ut mollit. Elit sint enim est nisi eiusmod minim officia culpa veniam. Culpa ullamco id ullamco cillum veniam esse in eu. Veniam aliquip nostrud commodo aliqua ad sit veniam fugiat aliquip ad quis minim in est. Enim veniam non fugiat nostrud.</p>

          <p>Eu officia laboris eiusmod labore consectetur reprehenderit elit amet culpa est. Nostrud labore adipisicing velit velit culpa mollit adipisicing ex aute fugiat qui exercitation non. Officia sunt minim qui non sit velit ut in nisi. Sit laborum in tempor exercitation laborum. Elit mollit commodo sunt eu aliquip consequat et eu id consequat.</p>
        </div>
        <div className='col-lg-3 col-md-4 col-sm-12 '>
          <h4> News </h4>
          <p>Amet velit laborum ipsum excepteur magna sunt deserunt elit occaecat tempor ullamco consectetur. Commodo eu magna id officia deserunt mollit amet incididunt laboris cupidatat. Ad consectetur ipsum ea eu ea eiusmod enim. Exercitation deserunt eiusmod exercitation amet non ut. Non amet tempor excepteur cillum. Ea sunt ipsum pariatur labore id Lorem irure. Aliqua Lorem exercitation quis mollit est est in culpa.</p>

          <p>Laboris sunt exercitation elit quis esse ea cillum. Tempor labore officia culpa voluptate incididunt elit laborum minim irure laborum ad et. Laboris nisi laboris exercitation quis sit. Fugiat consequat dolor enim commodo velit incididunt minim aliquip non. Et id excepteur mollit adipisicing adipisicing est reprehenderit deserunt.</p>
        </div>
      </div>
      <hr/>
      <div className='py-3 text-center'>
        <h5> Social feed </h5>
        <p>Adipisicing fugiat consequat tempor elit aute qui adipisicing culpa.</p>
        <div>
            <Link className='p-3 text-light text-decoration-none' to={'#'}> <YouTubeIcon/> </Link>
            <Link className='p-3 text-light text-decoration-none' to={'#'}> <FacebookSharpIcon/> </Link>
            <Link className='p-3 text-light text-decoration-none' to={'#'}> <LinkedInIcon/> </Link>
            <Link className='p-3 text-light text-decoration-none' to={'#'}> <TelegramIcon/> </Link>
        </div>
      </div>
  </div>
  )
}

export default Footer;
