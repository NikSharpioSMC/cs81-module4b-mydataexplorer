//Nik Sharpio
//Santa Monica College - Summer 2025 - CS81
//Module 4 Assignment 4B: My Personal Data Objects


let weekData = [
  { day: "Monday", sleepHours: 8, screenTime: 6, mood: "grateful", caffeineIntake: 1, focusLevel: 2 },
  { day: "Tuesday", sleepHours: 7, screenTime: 5, mood: "tired", caffeineIntake: 2, focusLevel: 3 },
  { day: "Wednesday", sleepHours: 6, screenTime: 4, mood: "productive", caffeineIntake: 1, focusLevel: 4 },
  { day: "Thursday", sleepHours: 8, screenTime: 7, mood: "relaxed", caffeineIntake: 0, focusLevel: 5 },
  { day: "Friday", sleepHours: 5, screenTime: 8, mood: "stressed", caffeineIntake: 3, focusLevel: 2 },
  { day: "Saturday", sleepHours: 9, screenTime: 3, mood: "happy", caffeineIntake: 1, focusLevel: 4 },
  { day: "Sunday", sleepHours: 7, screenTime: 6, mood: "content", caffeineIntake: 2, focusLevel: 3 }
]



/*
Analyzing Maya's Data Journal...

Most screen time: Wednesday (8 hrs)
Average sleep: 6.9 hrs
Most frequent mood: "productive"
Does more caffeine mean better focus? → Nope!

Reflection:
I thought caffeine helped me focus, but I was actually most focused on days with low caffeine.

Write at least 4 functions that explore your data. Example names:

findHighestScreenTime()
averageSleep()
mostFrequentMood()
correlateCaffeineToFocus()
*/

// Function to find the day with the highest screen time
function findHighestScreenTime(data) {
  let highest = data[0];
  for (let entry of data) {
    if (entry.screenTime > highest.screenTime) {
      highest = entry;
    }
  }
  return highest;
}
// Function to calculate the average sleep hours
function averageSleep(data) {
  let totalSleep = 0;
  for (let entry of data) {
    totalSleep += entry.sleepHours;
  }
  return totalSleep / data.length;
}
// Function to find the most frequent mood
function mostFrequentMood(data) {
  const moodCounts = {};
  for (let entry of data) {
    if (!moodCounts[entry.mood]) {
      moodCounts[entry.mood] = 1;
    } else {
      moodCounts[entry.mood]++;
    }
  }
  let maxMood = null;
  let maxCount = 0;
  for (let mood in moodCounts) {
    if (moodCounts[mood] > maxCount) {
      maxMood = mood;
      maxCount = moodCounts[mood];
    }
  }
  return maxMood;
}
// Function to correlate caffeine intake with focus level
function correlateCaffeineToFocus(data) {
  const correlation = {};
  for (let entry of data) {
    if (!correlation[entry.caffeineIntake]) {
      correlation[entry.caffeineIntake] = { totalFocus: 0, count: 0 };
    }
    correlation[entry.caffeineIntake].totalFocus += entry.focusLevel;
    correlation[entry.caffeineIntake].count++;
  }
  return correlation;
}
// Example usage
console.log("Day with highest screen time:", findHighestScreenTime(weekData));
console.log("Average sleep hours:", averageSleep(weekData));
console.log("Most frequent mood:", mostFrequentMood(weekData));
console.log("Caffeine to focus correlation:", correlateCaffeineToFocus(weekData));
