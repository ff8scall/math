import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import GradeSelection from './pages/GradeSelection';
import Curriculum from './pages/Curriculum';
import AdditionWithCarry from './components/math/AdditionWithCarry';
import Shop from './pages/Shop';
import MainLayout from './components/layout/MainLayout';

import FractionVisualizer from './components/math/FractionVisualizer';
import MultiplicationVisualizer from './components/math/MultiplicationVisualizer';
import GeometryExplorer from './components/math/GeometryExplorer';
import DivisionVisualizer from './components/math/DivisionVisualizer';
import ClockVisualizer from './components/math/ClockVisualizer';
import SubtractionWithBorrow from './components/math/SubtractionWithBorrow';
import UnitConverter from './components/math/UnitConverter';
import MathQuiz from './components/math/MathQuiz';
import WorksheetGenerator from './components/math/WorksheetGenerator';
import MyRoom from './pages/MyRoom';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Routes>
          <Route path="/" element={<GradeSelection />} />
          <Route path="/grade/:gradeId" element={<Curriculum />} />
          <Route path="/grade/3/arithmetic" element={<AdditionWithCarry />} />
          <Route path="/grade/3/fraction" element={<FractionVisualizer />} />
          <Route path="/grade/3/multiplication" element={<MultiplicationVisualizer />} />
          <Route path="/grade/3/geometry" element={<GeometryExplorer />} />
          <Route path="/grade/3/division" element={<DivisionVisualizer />} />
          <Route path="/grade/3/clock" element={<ClockVisualizer />} />
          <Route path="/grade/3/subtraction" element={<SubtractionWithBorrow />} />
          <Route path="/grade/3/length" element={<UnitConverter />} />
          <Route path="/grade/3/quiz" element={<MathQuiz />} />
          <Route path="/grade/3/worksheet" element={<WorksheetGenerator />} />
          <Route path="/myroom" element={<MyRoom />} />
          <Route path="/shop" element={<Shop />} />
          {/* Legacy or Direct routes can be redirected or kept for testing */}
          <Route path="/arithmetic" element={<AdditionWithCarry />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
