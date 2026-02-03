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
import CircleExplorer from './components/math/CircleExplorer';
import WeightVolumeConverter from './components/math/WeightVolumeConverter';

// 1학년 컴포넌트
import NumberCounting from './components/math/grade1/NumberCounting';
import ShapeExplorer1st from './components/math/grade1/ShapeExplorer1st';
import SimpleArithmetic1st from './components/math/grade1/SimpleArithmetic1st';
import NumberTo50 from './components/math/grade1/NumberTo50';
import ClockBasic1st from './components/math/grade1/ClockBasic1st';
import NumberTo100 from './components/math/grade1/NumberTo100';

// 2학년 컴포넌트
import ThreeDigitNumber from './components/math/grade2/ThreeDigitNumber';
import Shapes2nd from './components/math/grade2/Shapes2nd';
import TwoDigitArithmetic from './components/math/grade2/TwoDigitArithmetic';
import LengthMeasure from './components/math/grade2/LengthMeasure';
import FourDigitNumber from './components/math/grade2/FourDigitNumber';
import MultiplicationTable from './components/math/grade2/MultiplicationTable';
import TimeCalculation from './components/math/grade2/TimeCalculation';

// 4학년 컴포넌트
import LargeNumbers4th from './components/math/grade4/LargeNumbers4th';
import Angles4th from './components/math/grade4/Angles4th';
import MultiDiv4th from './components/math/grade4/MultiDiv4th';
import GeometryMove4th from './components/math/grade4/GeometryMove4th';
import BarGraph4th from './components/math/grade4/BarGraph4th';
import FindingRules4th from './components/math/grade4/FindingRules4th';

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
          <Route path="/grade/3/circle" element={<CircleExplorer />} />
          <Route path="/grade/3/weight-volume" element={<WeightVolumeConverter />} />

          {/* 1학년 Routes */}
          <Route path="/grade/1/number-counting" element={<NumberCounting />} />
          <Route path="/grade/1/shapes" element={<ShapeExplorer1st />} />
          <Route path="/grade/1/arithmetic" element={<SimpleArithmetic1st />} />
          <Route path="/grade/1/number-50" element={<NumberTo50 />} />
          <Route path="/grade/1/clock" element={<ClockBasic1st />} />
          <Route path="/grade/1/number-100" element={<NumberTo100 />} />

          {/* 2학년 Routes */}
          <Route path="/grade/2/three-digit" element={<ThreeDigitNumber />} />
          <Route path="/grade/2/shapes" element={<Shapes2nd />} />
          <Route path="/grade/2/arithmetic" element={<TwoDigitArithmetic />} />
          <Route path="/grade/2/length" element={<LengthMeasure />} />
          <Route path="/grade/2/four-digit" element={<FourDigitNumber />} />
          <Route path="/grade/2/multiplication" element={<MultiplicationTable />} />
          <Route path="/grade/2/time" element={<TimeCalculation />} />

          {/* 4학년 Routes */}
          <Route path="/grade/4/large-numbers" element={<LargeNumbers4th />} />
          <Route path="/grade/4/angles" element={<Angles4th />} />
          <Route path="/grade/4/arithmetic" element={<MultiDiv4th />} />
          <Route path="/grade/4/geometry-move" element={<GeometryMove4th />} />
          <Route path="/grade/4/bar-graph" element={<BarGraph4th />} />
          <Route path="/grade/4/rules" element={<FindingRules4th />} />

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
