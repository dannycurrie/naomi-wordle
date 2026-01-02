# Wordle Clone - Product Requirements Document

## 1. Overview

### 1.1 Product Description
A web-based word guessing game inspired by Wordle, for my daughter, to help her with learning words she is learning at school. She will attempt to guess a 5-10 letter word within 6 attempts. Each guess provides color-coded feedback indicating correct letters and positions.

The words which appear in the game can be set by an admin user.

### 1.2 Product Vision
Create an engaging, accessible word puzzle game that provides a challenge for a 7 year old learning to spell more and more complex words.

## 2. Goals and Objectives

### 2.1 Primary Goals
- Provide an intuitive, enjoyable word guessing experience for a 7 year old
- Maintain player engagement through daily challenges

## 3. Target Audience

### 3.1 Primary Users
- 7 year olds learning to spell
- people familiar with Wordle

## 4. Core Features

### 4.1 Game Mechanics

#### 4.1.1 Word Guessing
- **Description**: Players guess a 5-10 letter word in 6 attempts
- **Requirements**:
  - Input validation
  - Real-time feedback after each guess
  - Color-coded tile system:
    - Green: Correct letter in correct position
    - Yellow: Correct letter in wrong position
    - Gray: Letter not in word
  - Word validation against dictionary

#### 4.1.2 Admin set Challenge
- **Description**: One word at a time for each player
- **Requirements**:
  - Potential word list is set by admin user

#### 4.1.3 Game State Management
- **Description**: Track and persist game progress
- **Requirements**:
  - Save current game state
  - Track statistics (games played, win rate, streak)
  - Handle browser refresh gracefully
  - Local storage implementation

### 4.2 User Interface

#### 4.2.1 Game Board
- **Description**: Visual grid for word guesses
- **Requirements**:
  - 6 rows × 5 - 10 columns grid (depending on word length)
  - Tile animations (flip, shake for invalid words)
  - Responsive design (mobile, tablet, desktop)
  - Color accessibility (colorblind-friendly)

#### 4.2.2 Keyboard
- **Description**: Virtual keyboard for input
- **Requirements**:
  - QWERTY layout
  - Visual feedback matching tile colors
  - Disabled state for used letters
  - Physical keyboard support

#### 4.2.3 Statistics Display
- **Description**: Show player performance metrics
- **Requirements**:
  - Games played count
  - Win percentage
  - Current streak
  - Best streak
  - Guess distribution chart

#### 4.2.4 Results Modal
- **Description**: Display game outcome and share functionality
- **Requirements**:
  - Win/loss message
  - Play next word button 

 #### 4.2.5 Reset game
- **Description**: Move onto next word when player is ready
- **Requirements**:
  - Pressing 'Play Next Word' resets the game with a new word from the potental word list

## 5. User Stories

### 5.1 Core User Stories
1. **As a player**, I want to guess a 5-10 letter word so that I can solve the puzzle
2. **As a player**, I want to see color-coded feedback so that I know which letters are correct
3. **As a player**, I want to use my physical keyboard so that I can type faster
4. **As a player**, I want to see my statistics so that I can track my progress

### 5.2 Admin User Stories 
1. **As an admin**, I want to be able to add, edit and remove words to a list of potentiak words for the puzzle

## 6. Technical Requirements

### 6.1 Platform & Technology
- **Platform**: Web application
- **Frontend Framework**: Next.js
- **Styling**: Tailwind
- **Storage**: LocalStorage for game state, Supabase table for challenge words
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari)

### 6.3 Data Requirements
- Word list (5-10 letter words)
- Statistics storage structure

## 7. Design Requirements

### 7.1 Visual Design
- Clean, minimalist interface
- Consistent color palette
- Smooth animations and transitions
- Responsive grid layout
- Typography: Clear, readable fonts

### 7.2 Color Scheme
- **Primary Colors**:
  - Green: Correct position (#6AAA64 or similar)
  - Yellow: Wrong position (#C9B458 or similar)
  - Gray: Not in word (#787C7E or similar)
- **Background**: Light/Dark theme support
- **Text**: High contrast for readability

### 7.3 Interaction Design
- Hover states on interactive elements
- Click/tap feedback
- Loading states
- Error states (invalid word, network issues)
- Success animations

## 8. Non-Functional Requirements

### 8.1 Usability
- Intuitive interface requiring minimal learning
- Clear visual feedback
- Error prevention and handling
- Helpful error messages

### 8.2 Reliability
- Graceful degradation
- Offline capability (cached word list)
- Data persistence across sessions
- Error recovery

### 8.3 Security
- Client-side only (no user data collection)
- Input sanitization
- XSS prevention
- Secure word selection (non-predictable)

## 9. Out of Scope (v1.0)

- Multiplayer features
- User accounts/authentication
- Leaderboards
- Custom word lists
- Multiple languages
- Sound effects/music
- Mobile app versions
- Social media integratio
- Hint system
- Undo functionality

## 10. Future Enhancements (Post-v1.0)

- Multiple difficulty levels
- Custom game modes
- Word length variations (4-letter, 6-letter)
- Themed word sets
- Achievement system
- Daily streak rewards
- Community features

## 11. Timeline & Milestones

### Phase 1: MVP (Minimum Viable Product)
- [ ] Core game mechanics
- [ ] Basic UI/UX
- [ ] Word validation against hard-coded word
- [ ] Local storage

### Phase 2: Admin functionality
- [ ] Admin login
- [ ] Word list in Supabase
- [ ] Ability to edit word list

### Phase 3: Polish
- [ ] Animations and transitions
- [ ] Statistics tracking
- [ ] Share functionality
- [ ] Settings panel
- [ ] Help/instructions

## 12. Dependencies & Constraints

### 12.1 Dependencies
- Dictionary source
- Browser LocalStorage API
- Modern JavaScript features

### 12.2 Constraints
- Browser compatibility requirements
- Performance on low-end devices
- Network-independent operation

## 13. Assumptions

- Users have modern browsers with JavaScript enabled
- Users understand basic English (if English version)
- Daily word selection can be deterministic based on date
- LocalStorage is available and reliable

## 14. Risks & Mitigation

### 14.1 Technical Risks
- **Risk**: Browser compatibility issues
  - **Mitigation**: Progressive enhancement, polyfills
- **Risk**: Performance on mobile devices
  - **Mitigation**: Optimize animations, lazy loading

### 14.2 Product Risks
- **Risk**: Low user engagement
  - **Mitigation**: Polished UX, social sharing features
- **Risk**: Word list quality
  - **Mitigation**: Curated word list, validation testing

---

## Appendix

### A. Glossary
- **Tile**: Individual letter cell in the game grid
- **Guess**: A 5-letter word attempt
- **Streak**: Consecutive days of solving the puzzle
- **Hard Mode**: Mode requiring use of revealed hints

### B. References
- Original Wordle game mechanics

### C. Notes
- This PRD is a living document and should be updated as requirements evolve
- Technical implementation details will be documented separately
- Design mockups and prototypes should be created based on this PRD

