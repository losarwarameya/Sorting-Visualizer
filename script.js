// Function to generate an array of random numbers
function generateRandomArray(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 100) + 1);
    }
    return arr;
}

// Function to create bars representing array elements
function createBars(array, containerId, className) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.className = `bar ${className}`;
        bar.style.height = `${array[i] * 2}px`;
        container.appendChild(bar);
    }
}

// Bubble Sort Algorithm
async function bubbleSort(array) {
    const n = array.length;
    let swapped;

    do {
        swapped = false;

        for (let i = 0; i < n - 1; i++) {
            if (array[i] > array[i + 1]) {
                // Swap elements
                const temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;

                // Visualize the swap by updating the bars
                createBars(array, 'bubble-container', 'bubble');

                // Add a delay for visualization (you can adjust the delay)
                await new Promise(resolve => setTimeout(resolve, 100));
                
                swapped = true;
            }
        }
    } while (swapped);
}

// Merge Sort Algorithm
async function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    const leftSorted = await mergeSort(left);
    const rightSorted = await mergeSort(right);

    return merge(leftSorted, rightSorted);
}

async function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }

        // Visualize the merge by updating the bars
        createBars(result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex)), 'merge-container', 'merge');

        // Add a delay for visualization (you can adjust the delay)
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Function to start the Bubble Sort visualization
function startBubbleSort() {
    const array = generateRandomArray(10); // Change the array size as needed
    createBars(array, 'bubble-container', 'bubble');
    bubbleSort(array);
}

// Function to start the Merge Sort visualization
async function startMergeSort() {
    const array = generateRandomArray(10); // Change the array size as needed
    createBars(array, 'merge-container', 'merge');
    await mergeSort(array);
}
