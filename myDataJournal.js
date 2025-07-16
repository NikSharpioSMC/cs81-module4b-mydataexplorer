//Nik Sharpio
//Santa Monica College - Summer 2025 - CS81
//Module 4 Assignment 4B: My Personal Data Objects
//https://github.com/NikSharpioSMC/cs81-module4b-mydataexplorer.git


// Weekly data journal
// --- Data Setup ---
// weekData will hold the data for each day of the week
// moods will hold the possible moods for each day
// daysOfWeek will hold the names of the days of the week
const weekData = [];
const moods = [
  "sleepy",      // moods[0] - lowest energy/alertness
  "relaxed",     // moods[1]
  "laid-back",   // moods[2]
  "smooth",      // moods[3]
  "focused",     // moods[4] - optimal state
  "productive",  // moods[5]
  "intense",     // moods[6]
  "jumpy",       // moods[7]
  "grumpy",      // moods[8] - highest stress/negative
];

// Fixed: Added missing daysOfWeek array
const daysOfWeek = [
  "Monday", "Tuesday", "Wednesday", "Thursday", 
  "Friday", "Saturday", "Sunday"
];

// Mood rules organized by mood level (sleepy to grumpy)
// Each mood index (0-8) is represented at least once and rules are ordered by mood level.
const moodRules = [
  {
    // sleepy: very low sleep
    condition: (sleepHours, _caffeineIntake, _screenTime, _focusLevel) =>
      sleepHours <= 4,
    mood: moods[0] // "sleepy"
  },
  {
    // relaxed: low screen time and low caffeine
    condition: (_sleepHours, caffeineIntake, screenTime, _focusLevel) =>
      screenTime < 8 && caffeineIntake < 2,
    mood: moods[1] // "relaxed"
  },
  {
    // laid-back: low screen time and very low caffeine
    condition: (_sleepHours, caffeineIntake, screenTime, _focusLevel) =>
      screenTime < 10 && caffeineIntake < 1,
    mood: moods[2] // "laid-back"
  },
  {
    // smooth: moderate screen time and low-moderate caffeine
    condition: (_sleepHours, caffeineIntake, screenTime, _focusLevel) =>
      screenTime >= 10 && screenTime < 12 && caffeineIntake <= 2,
    mood: moods[3] // "smooth"
  },
  {
    // focused: high focus and good sleep
    condition: (sleepHours, _caffeineIntake, _screenTime, focusLevel) =>
      focusLevel >= 8 && sleepHours >= 7,
    mood: moods[4] // "focused"
  },
  {
    // productive: high screen time but low caffeine
    condition: (_sleepHours, caffeineIntake, screenTime, _focusLevel) =>
      screenTime >= 12 && screenTime < 14 && caffeineIntake <= 1,
    mood: moods[5] // "productive"
  },
  {
    // intense: high screen time and moderate-high caffeine
    condition: (_sleepHours, caffeineIntake, screenTime, _focusLevel) =>
      (screenTime >= 14 && screenTime < 16 && caffeineIntake >= 2) ||
      (screenTime > 10 && caffeineIntake >= 3),
    mood: moods[6] // "intense"
  },
  {
    // jumpy: very high screen time and high caffeine, or high caffeine but low focus
    condition: (_sleepHours, caffeineIntake, screenTime, focusLevel) =>
      (screenTime >= 16 && caffeineIntake >= 3) ||
      (caffeineIntake > 2 && focusLevel < 5),
    mood: moods[7] // "jumpy"
  },
  {
    // grumpy: high screen time, max caffeine, low sleep
    condition: (sleepHours, caffeineIntake, screenTime, _focusLevel) =>
      screenTime > 12 && caffeineIntake === 4 && sleepHours < 6,
    mood: moods[8]
  },
];

// Helper to get a random number within a range
function getRandomValue(min, max, isInteger = true) { // Generate a random number between min and max, isInterger = true for integers because we want whole numbers for hours and cups
  // If isInteger is true, return an integer; otherwise, return a float
  // This allows for flexibility in generating both whole numbers and decimal values
  // For example, sleep hours and caffeine intake should be integers, while screen time can be a float.
  if (isInteger) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // Return a random integer between min and max (inclusive)
  }
  return Math.random() * (max - min) + min; // Return a random float between min and max (exclusive)
}

// --- Populate Week Data ---
// Loop through each day of the week
// Sleep hours: random between 4 and 10 hours
// This simulates a range of sleep patterns, from less to more restful nights.
// Sleep is crucial for focus and mood.
for (const day of daysOfWeek) {
  const sleepHours = getRandomValue(0, 24); // 0-24 hours

  // Screen time: depends on sleep, min 8, max 16
  // This simulates a range of screen time, which can affect focus and mood.
  // Less sleep often means more awake time, so more screen time, capped.
  // Screen time is clamped between 8 and 16 hours to simulate realistic usage.
  let screenTime = 24 - sleepHours; // ScreenTime starts at 24 minus sleep hours because more awake time generally means more screen time.
  screenTime = Math.min(Math.max(screenTime, 8), 16); // screenTime is clamped between 8 and 16 hours

  const caffeineIntake = getRandomValue(0, 4); // the random number of cups of caffeine consumed, between 0 and 4 cups

  // Focus level: depends on sleep and caffeine (0-10)
  // More sleep and moderate caffeine generally improve focus.
  let focusLevel = (sleepHours / 2.4) + (caffeineIntake * 1.5); // Calculate focus level based on sleep and caffeine, we use 2.4 as a divisor to scale sleep hours to a reasonable focus level, and 1.5 as a multiplier for caffeine intake to boost focus.
  // This means that more sleep and moderate caffeine will yield a higher focus level.
  // Focus level is capped at 10 and cannot be negative.
  focusLevel = Math.min(Math.round(focusLevel), 10); // 10 is the maximum focus level
  focusLevel = Math.max(focusLevel, 0); // 0 is the minimum focus level

  // Fixed: Use the predefined moodRules array instead of redundant if-else chains
  let mood = moods[getRandomValue(0, moods.length - 1)]; // Start with a random mood

  // Apply mood rules in order of specificity
  for (const rule of moodRules) {
    if (rule.condition(sleepHours, caffeineIntake, screenTime, focusLevel)) {
      mood = rule.mood;
      break; // Use the first matching rule
    }
  }

  // Add the day's data to the weekData array
  // Each entry contains the day, sleep hours, screen time, mood, caffeine intake, and focus level
  // This allows for a structured representation of daily data for analysis later
  weekData.push({
    day: day,
    sleepHours: sleepHours,
    screenTime: screenTime,
    mood: mood,
    caffeineIntake: caffeineIntake,
    focusLevel: focusLevel,
  });
}

// --- Data Analyzer Object with Methods ---
const dataAnalyzer = {
  // This object contains methods to analyze the weekData array
  // It calculates statistics for screen time, sleep, mood, and caffeine focus
  // The analyze method runs all analyses and prints the results to the console
  analyze: function () {
    console.log("Analyzing Your Data Journal...\n");
    // Get statistics for screen time, sleep, mood, and caffeine focus
    const screenStats = this.getScreenTimeStats();        // Get screen time statistics
    const sleepStats = this.getSleepStats();              // Get sleep statistics
    const moodStats = this.getMoodStats();                // Get mood statistics
    const caffeineStats = this.getCaffeineFocusStats();   // Get caffeine focus statistics

    console.log(`Most screen time: ${screenStats.most} hours on ${screenStats.mostDay}`);                               // Most screen time
    console.log(`Lowest screen time: ${screenStats.least} hours on ${screenStats.leastDay}`);                           // Least screen time
    console.log(`Average screen time: ${screenStats.avg.toFixed(2)} hours`);                                            // Average screen time

    console.log(`Most amount of sleep: ${sleepStats.most} hours on ${sleepStats.mostDay}`);                             // Most amount of sleep
    console.log(`Least amount of sleep: ${sleepStats.least} hours on ${sleepStats.leastDay}`);                          // Least amount of sleep
    console.log(`Average amount of sleep: ${sleepStats.avg.toFixed(2)} hours`);                                         // Average amount of sleep

    console.log(`Most frequent mood: ${moodStats.mostFrequent}`);                                                       // Most frequent mood
    console.log(`Least frequent mood: ${moodStats.leastFrequent}`);                                                     // Least frequent mood

    console.log(`Does more caffeine mean better focus? → ${caffeineStats.moreCaffeineBetterFocus ? 'Yes' : 'No'}`);     // Does more caffeine mean better focus?
    console.log(`Does less caffeine mean better focus? → ${caffeineStats.lessCaffeineBetterFocus ? 'Yes' : 'No'}`);     // Does less caffeine mean better focus?
    console.log(`Where does caffeine fit in better with the focus? → ${caffeineStats.conclusion}`);                     // Where does caffeine fit in better with the focus?

    console.log("\nReflection:");
    // Reflect on the data
    console.log(`This week, I had an average of ${screenStats.avg.toFixed(2)} hours of screen time, which is ${screenStats.avg > 12 ? 'quite high' : 'moderate'}.`);
    console.log(`I averaged ${sleepStats.avg.toFixed(2)} hours of sleep, which is ${sleepStats.avg < 7 ? 'below' : 'above'} the recommended amount.`);
    console.log(`My most frequent mood was "${moodStats.mostFrequent}", which suggests I was ${moodStats.mostFrequent === 'focused' ? 'productive' : 'not as productive'} this week.`);

    // Reflect on caffeine and focus
    if (caffeineStats.lessCaffeineBetterFocus) {
      console.log("I thought caffeine helped me focus, but based on this week's data, I was actually most focused on days with low caffeine.");
    } else if (caffeineStats.moreCaffeineBetterFocus) {
      console.log("It seems that more caffeine has actually helped me stay focused this week.");
    } else {
      console.log("This week's data shows no clear pattern between caffeine intake and focus level.");
    }
  },

  // Methods to get statistics for screen time, sleep, mood, and caffeine focus
  // Each method returns an object with relevant statistics
  // This method calculates statistics for screen time
  getScreenTimeStats: function () {
    let total = 0, most = 0, least = 24, mostDay = "", leastDay = "";  // Initialize variables to track total screen time, most screen time, least screen time, and the corresponding days
    for (let dayData of weekData) {                                    // Loop through each day's data
      total += dayData.screenTime;                                     // Add the screen time for the day to the total
      if (dayData.screenTime > most) {                                 // If the day's screen time is greater than the current most, update most and mostDay
        most = dayData.screenTime;                                     // Update most screen time
        mostDay = dayData.day;                                         // Update the day with most screen time
      }                                                                // If the day's screen time is less than the current least, update least and leastDay
      if (dayData.screenTime < least) {                                // Update least screen time
        least = dayData.screenTime;                                    // Update least screen time
        leastDay = dayData.day;                                        // Update the day with least screen time
      }                                                                // End of if condition
    }
    return {
      avg: total / weekData.length,
      most,
      mostDay,
      least,
      leastDay
    };                                                                  // Return an object containing the average, most, least screen time and their corresponding day
  },

  getSleepStats: function () {                                         // This method calculates statistics for sleep hours
    let total = 0, most = 0, least = 24, mostDay = "", leastDay = "";  // Initialize variables to track total sleep hours, most sleep hours, least sleep hours, and the corresponding days
    for (let dayData of weekData) {                                    // Loop through each day's data
      total += dayData.sleepHours;                                     // Add the sleep hours for the day to the total
      if (dayData.sleepHours > most) {                                 // If the day's sleep hours are greater than the current most, update most and mostDay
        most = dayData.sleepHours;                                     // Update most sleep hours
        mostDay = dayData.day;                                         // Update the day with most sleep hours
      }                                                                // If the day's sleep hours are less than the current least, update least and leastDay
      if (dayData.sleepHours < least) {                                // Update least sleep hours
        least = dayData.sleepHours;                                    // Update least sleep hours
        leastDay = dayData.day;                                        // Update the day with least sleep hours
      }
    }
    return {
      avg: total / weekData.length,
      most,
      mostDay,
      least,
      leastDay
    };
  },

  // This method calculates statistics for mood
  // It counts occurrences of each mood and determines the most and least frequent moods
  // It returns an object with the most frequent mood, least frequent mood, and their counts
  getMoodStats: function () {
    const moodCounts = {};  // Initialize an object to count occurrences of each mood
    for (let dayData of weekData) { // Loop through each day's data
      moodCounts[dayData.mood] = (moodCounts[dayData.mood] || 0) + 1;  // Count the occurrences of each mood
    }
    let mostFrequent = "", leastFrequent = "", maxCount = 0, minCount = Infinity;
    for (let mood in moodCounts) {  // Loop through each mood in the moodCounts object
      if (moodCounts[mood] > maxCount) {  // If the count of the current mood is greater than the current maxCount, update mostFrequent and maxCount
        maxCount = moodCounts[mood];  // Update maxCount
        mostFrequent = mood;  // Update mostFrequent mood
      }
      if (moodCounts[mood] < minCount) {  // If the count of the current mood is less than the current minCount, update minCount
        minCount = moodCounts[mood];  // Update minCount
      }
    }
    // Find all moods with minCount
    const leastFrequentMoods = Object.keys(moodCounts).filter(mood => moodCounts[mood] === minCount);
    // If only one least frequent mood, use it; otherwise, join them with commas
    leastFrequent = leastFrequentMoods.length === 1 ? leastFrequentMoods[0] : leastFrequentMoods.join(", ");
    return {
      mostFrequent,
      leastFrequent
    };
  },

  getCaffeineFocusStats: function () { // This method calculates statistics for caffeine intake and focus levels
    let totalFocusHigh = 0, countHigh = 0, totalFocusLow = 0, countLow = 0; // Initialize variables to track total focus levels for high and low caffeine days, and their counts
    for (let dayData of weekData) { // Loop through each day's data
      if (dayData.caffeineIntake >= 3) { // If caffeine intake is high (3 or more cups)
        totalFocusHigh += dayData.focusLevel; // Add the focus level for high caffeine days to totalFocusHigh
        countHigh++; // Increment the count for high caffeine days
      } else if (dayData.caffeineIntake <= 1) { // If caffeine intake is low (1 or fewer cups)
        totalFocusLow += dayData.focusLevel; // Add the focus level for low caffeine days to totalFocusLow
        countLow++; // Increment the count for low caffeine days
      }
      // Days with caffeineIntake === 2 are ignored (medium caffeine)
    }
    const avgHigh = countHigh > 0 ? (totalFocusHigh / countHigh) : 0; // Calculate average focus level for high caffeine days, avoiding division by zero
    const avgLow = countLow > 0 ? (totalFocusLow / countLow) : 0; // Calculate average focus level for low caffeine days, avoiding division by zero
    let moreCaffeineBetterFocus = false; // Initialize a flag to track if more caffeine correlates with better focus
    let lessCaffeineBetterFocus = false; // Initialize a flag to track if less caffeine correlates with better focus
    let conclusion; // Initialize a conclusion variable to provide insights based on the analysis

    // BUG FIX: Previously, if avgHigh === avgLow and both counts > 0, it would say "No clear difference..."
    // But if both counts are 0, it should also say "No high or low caffeine days..."
    // The logic below is correct, but let's clarify the order and ensure all cases are handled.

    if (countHigh === 0 && countLow === 0) {
      conclusion = "No high or low caffeine days this week to compare focus levels.";
    } else if (countHigh === 0) {
      conclusion = "No high caffeine days this week to compare focus levels.";
    } else if (countLow === 0) {
      conclusion = "No low caffeine days this week to compare focus levels.";
    } else if (avgHigh > avgLow) {
      moreCaffeineBetterFocus = true;
      conclusion = "More caffeine seems to correlate with better focus this week.";
    } else if (avgLow > avgHigh) {
      lessCaffeineBetterFocus = true;
      conclusion = "Less caffeine seems to correlate with better focus this week.";
    } else if (countHigh > 0 && countLow > 0 && avgHigh === avgLow) {
      conclusion = "No clear difference in focus between high and low caffeine days.";
    } else {
      conclusion = "Not enough data to determine the effect of caffeine on focus.";
    }
    return {
      moreCaffeineBetterFocus,
      lessCaffeineBetterFocus,
      conclusion
    };
  },
};

// Run the analysis
dataAnalyzer.analyze();