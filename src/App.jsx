import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import GradeSelection from './pages/GradeSelection';
import Curriculum from './pages/Curriculum';
import MathWorksheet from './components/math/MathWorksheet';
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
import Grade1Quiz from './components/math/Grade1Quiz';
import WordProblemQuiz from './components/math/WordProblemQuiz';
import WordProblemWorksheet from './components/math/WordProblemWorksheet';

// 2학년 컴포넌트
import ThreeDigitNumber from './components/math/grade2/ThreeDigitNumber';
import Shapes2nd from './components/math/grade2/Shapes2nd';
import TwoDigitArithmetic from './components/math/grade2/TwoDigitArithmetic';
import LengthMeasure from './components/math/grade2/LengthMeasure';
import FourDigitNumber from './components/math/grade2/FourDigitNumber';
import MultiplicationTable from './components/math/grade2/MultiplicationTable';
import TimeCalculation from './components/math/grade2/TimeCalculation';
import Grade2Quiz from './components/math/Grade2Quiz';

// 4학년 컴포넌트
import LargeNumbers4th from './components/math/grade4/LargeNumbers4th';
import Angles4th from './components/math/grade4/Angles4th';
import MultiDiv4th from './components/math/grade4/MultiDiv4th';
import GeometryMove4th from './components/math/grade4/GeometryMove4th';
import BarGraph4th from './components/math/grade4/BarGraph4th';
import FindingRules4th from './components/math/grade4/FindingRules4th';
import FractionArithmetic4th from './components/math/grade4/FractionArithmetic4th';
import TriangleExplorer4th from './components/math/grade4/TriangleExplorer4th';
import DecimalArithmetic4th from './components/math/grade4/DecimalArithmetic4th';
import QuadrilateralExplorer4th from './components/math/grade4/QuadrilateralExplorer4th';
import LineGraph4th from './components/math/grade4/LineGraph4th';
import Grade4Quiz from './components/math/Grade4Quiz';
import Polygons4th from './components/math/grade4/Polygons4th';

// 5학년 컴포넌트
import MixedArithmetic5th from './components/math/grade5/MixedArithmetic5th';
import FactorsMultiples5th from './components/math/grade5/FactorsMultiples5th';
import RulesResponse5th from './components/math/grade5/RulesResponse5th';
import ReductionCommonDenom5th from './components/math/grade5/ReductionCommonDenom5th';
import FractionArithmetic5th from './components/math/grade5/FractionArithmetic5th';
import PerimeterArea5th from './components/math/grade5/PerimeterArea5th';
import NumbersRange5th from './components/math/grade5/NumbersRange5th';
import FractionMultiplication5th from './components/math/grade5/FractionMultiplication5th';
import CongruenceSymmetry5th from './components/math/grade5/CongruenceSymmetry5th';
import DecimalMultiplication5th from './components/math/grade5/DecimalMultiplication5th';
import Cuboids5th from './components/math/grade5/Cuboids5th';
import AveragePossibility5th from './components/math/grade5/AveragePossibility5th';
import Grade5Quiz from './components/math/Grade5Quiz';

// 6학년 컴포넌트
import FractionDivision6th from './components/math/grade6/FractionDivision6th';
import Geometry6th from './components/math/grade6/Geometry6th';
import DecimalDivision6th from './components/math/grade6/DecimalDivision6th';
import RatioProportion6th from './components/math/grade6/RatioProportion6th';
import VolumeArea6th from './components/math/grade6/VolumeArea6th';
import CircleArea6th from './components/math/grade6/CircleArea6th';
import Graphs6th from './components/math/grade6/Graphs6th';
import Proportion6th from './components/math/grade6/Proportion6th';
import RoundGeometry6th from './components/math/grade6/RoundGeometry6th';
import Grade6Quiz from './components/math/Grade6Quiz';
import MathGame from './pages/MathGame';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Routes>
          {/* The provided code snippet seems to be a mix of JS logic and JSX routes.
              Assuming the intent was to add the JS logic within a component and then define routes.
              Since this is App.js, the JS logic cannot be placed directly here.
              I will only apply the route definitions as they are syntactically valid for this file.
              The instruction about coin rewards implies changes within specific components, not App.js itself.
              The provided snippet `setScore(score + 10); updateCoins(10); confetti();e path="/" element={<GradeSelection />} />`
              is syntactically incorrect. I will correct the route part and ignore the JS logic
              as it cannot be placed here.
          */}
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
          <Route path="/grade/:gradeId/quiz" element={<MathQuiz />} />
          <Route path="/grade/:gradeId/word-problem" element={<WordProblemQuiz />} />
          <Route path="/grade/:gradeId/word-problem-worksheet" element={<WordProblemWorksheet />} />
          <Route path="/grade/:gradeId/worksheet" element={<WorksheetGenerator />} />
          <Route path="/grade/3/circle" element={<CircleExplorer />} />
          <Route path="/grade/3/weight-volume" element={<WeightVolumeConverter />} />

          {/* 1학년 Routes */}
          <Route path="/grade/1/number-counting" element={<NumberCounting />} />
          <Route path="/grade/1/shapes" element={<ShapeExplorer1st />} />
          <Route path="/grade/1/arithmetic" element={<SimpleArithmetic1st />} />
          <Route path="/grade/1/number-50" element={<NumberTo50 />} />
          <Route path="/grade/1/clock" element={<ClockBasic1st />} />
          <Route path="/grade/1/number-100" element={<NumberTo100 />} />
          <Route path="/grade/1/quiz" element={<Grade1Quiz />} />

          {/* 2학년 Routes */}
          <Route path="/grade/2/three-digit" element={<ThreeDigitNumber />} />
          <Route path="/grade/2/shapes" element={<Shapes2nd />} />
          <Route path="/grade/2/arithmetic" element={<TwoDigitArithmetic />} />
          <Route path="/grade/2/length" element={<LengthMeasure />} />
          <Route path="/grade/2/four-digit" element={<FourDigitNumber />} />
          <Route path="/grade/2/multiplication" element={<MultiplicationTable />} />
          <Route path="/grade/2/time" element={<TimeCalculation />} />
          <Route path="/grade/2/quiz" element={<Grade2Quiz />} />

          {/* 4학년 Routes */}
          <Route path="/grade/4/large-numbers" element={<LargeNumbers4th />} />
          <Route path="/grade/4/angles" element={<Angles4th />} />
          <Route path="/grade/4/arithmetic" element={<MultiDiv4th />} />
          <Route path="/grade/4/geometry-move" element={<GeometryMove4th />} />
          <Route path="/grade/4/bar-graph" element={<BarGraph4th />} />
          <Route path="/grade/4/rules" element={<FindingRules4th />} />
          <Route path="/grade/4/fraction" element={<FractionArithmetic4th />} />
          <Route path="/grade/4/triangle" element={<TriangleExplorer4th />} />
          <Route path="/grade/4/decimal" element={<DecimalArithmetic4th />} />
          <Route path="/grade/4/quadrilateral" element={<QuadrilateralExplorer4th />} />
          <Route path="/grade/4/line-graph" element={<LineGraph4th />} />
          <Route path="/grade/4/polygons" element={<Polygons4th />} />
          <Route path="/grade/4/quiz" element={<Grade4Quiz />} />

          {/* 5학년 Routes */}
          <Route path="/grade/5/mixed-arithmetic" element={<MixedArithmetic5th />} />
          <Route path="/grade/5/factors-multiples" element={<FactorsMultiples5th />} />
          <Route path="/grade/5/rules" element={<RulesResponse5th />} />
          <Route path="/grade/5/reduction" element={<ReductionCommonDenom5th />} />
          <Route path="/grade/5/fraction-arithmetic" element={<FractionArithmetic5th />} />
          <Route path="/grade/5/area" element={<PerimeterArea5th />} />
          <Route path="/grade/5/range" element={<NumbersRange5th />} />
          <Route path="/grade/5/fraction-multiplication" element={<FractionMultiplication5th />} />
          <Route path="/grade/5/congruence" element={<CongruenceSymmetry5th />} />
          <Route path="/grade/5/decimal-multiplication" element={<DecimalMultiplication5th />} />
          <Route path="/grade/5/cuboid" element={<Cuboids5th />} />
          <Route path="/grade/5/average" element={<AveragePossibility5th />} />
          <Route path="/grade/5/quiz" element={<Grade5Quiz />} />

          {/* 6학년 Routes */}
          <Route path="/grade/6/fraction-division" element={<FractionDivision6th />} />
          <Route path="/grade/6/geometry" element={<Geometry6th />} />
          <Route path="/grade/6/decimal-division" element={<DecimalDivision6th />} />
          <Route path="/grade/6/ratio" element={<RatioProportion6th />} />
          <Route path="/grade/6/graphs" element={<Graphs6th />} />
          <Route path="/grade/6/volume" element={<VolumeArea6th />} />
          <Route path="/grade/6/proportion" element={<Proportion6th />} />
          <Route path="/grade/6/circle-area" element={<CircleArea6th />} />
          <Route path="/grade/6/round-geometry" element={<RoundGeometry6th />} />
          <Route path="/grade/6/quiz" element={<Grade6Quiz />} />
          <Route path="/grade/:gradeId/game" element={<MathGame />} />

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
