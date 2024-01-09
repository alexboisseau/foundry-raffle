export const formatMilliseconds = (ms: number) => {
  // Ensure the input is a positive number
  if (ms < 0) {
    throw new Error("Invalid input");
  }

  // Convert milliseconds to seconds
  const seconds = Math.floor(ms / 1000);

  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Format the result with leading zeros
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  // Combine formatted values as xxhxxmxxs
  const formattedTime = `${formattedHours}h${formattedMinutes}m${formattedSeconds}s`;

  return formattedTime;
};
