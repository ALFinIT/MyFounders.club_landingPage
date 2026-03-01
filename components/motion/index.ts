// Export all motion design system components
export { HeroTitle } from './HeroTitle'
export { ScrollReveal, ScrollRevealGrid, ScrollRevealList } from './ScrollReveal'
export { MotionCard, MotionCardImage, CardGrid } from './MotionCard'
export {
  MotionButton,
  LinkButton,
  FloatingActionButton,
  ButtonGroup,
} from './MotionButton'
export {
  PageTransition,
  SectionTransition,
  StaggerContainer,
  RevealText,
  SimpleAnimated,
} from './PageTransition'

// Export motion configurations
export {
  TIMING,
  EASING,
  heroTypographyVariants,
  heroContainerVariants,
  scrollRevealVariants,
  scrollRevealContainerVariants,
  cardHoverVariants,
  buttonVariants,
  pageTransitionVariants,
  pageSlideVariants,
  fadeInVariants,
  scaleInVariants,
  rotateInVariants,
  getTransitionDuration,
  createAccessibleVariant,
} from '@/lib/motion-configs'
