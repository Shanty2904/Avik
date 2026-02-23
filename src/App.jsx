import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Illustrations from './pages/Illustrations.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Contact from './pages/Contact.jsx'

// Illustration sub-pages
import WeepingWillow from './pages/illustrations/WeepingWillow.jsx'
import FloralFaces from './pages/illustrations/FloralFaces.jsx'
import WinterCabin from './pages/illustrations/WinterCabin.jsx'
import TideMural from './pages/illustrations/TideMural.jsx'

// Project sub-pages
import Project1 from './pages/projects/Project1.jsx'
import Project2 from './pages/projects/Project2.jsx'
import Project3 from './pages/projects/Project3.jsx'
import Project4 from './pages/projects/Project4.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="illustrations" element={<Illustrations />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />

        {/* Illustration sub-pages */}
        <Route path="illustrations/weeping-willow" element={<WeepingWillow />} />
        <Route path="illustrations/floral-faces" element={<FloralFaces />} />
        <Route path="illustrations/winter-cabin" element={<WinterCabin />} />
        <Route path="illustrations/tide-mural" element={<TideMural />} />

        {/* Project sub-pages */}
        <Route path="projects/project-1" element={<Project1 />} />
        <Route path="projects/project-2" element={<Project2 />} />
        <Route path="projects/project-3" element={<Project3 />} />
        <Route path="projects/project-4" element={<Project4 />} />
      </Route>
    </Routes>
  )
}
