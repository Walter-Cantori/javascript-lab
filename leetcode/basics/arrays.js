//Remove Duplicates from Sorted Array
// Given a sorted array, remove the duplicates in-place such that each element appear only once and return the new length.
// Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.
// Example:
// Given nums = [1,1,2],

// Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.
// It doesn't matter what you leave beyond the new length.

//var removeDuplicates = function(nums) {
    // nums = nums.reduce((acc, curr) => {
    //     if(acc.indexOf(curr) == -1) acc.push(curr)
    //     return acc
    // }, [])
    // return nums

//     for (let i = 0; i < nums.length; i++){
//         if(nums[i] == nums[i + 1]){
//             nums.splice(i, 1)
//             i--
//         }
//     }
    
//     return nums
// };

// console.log(removeDuplicates([1,1,2,2,3]))






//Rotate Array
// Rotate an array of n elements to the right by k steps.

// For example, with n = 7 and k = 3, the array [1,2,3,4,5,6,7] is rotated to [5,6,7,1,2,3,4].

// Note:
// Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.

// [show hint]

// Related problem: Reverse Words in a String II

// Credits:
// Special thanks to @Freezen for adding this problem and creating all test cases.

// var rotate = function(nums, k) {
//     let dic = {}
//     for(let i = 0; i < nums.length; i++){
//         let key = i + k;
//         if(key >= nums.length) key = key-nums.length
//         dic[key] = nums[i]
//     }
    
//     for(let i=0; i < nums.length; i++){
//         nums[i] = dic[i]
//     }

//     console.log(nums)
// };

// let arr = [1,2,3,4,5,6,7]
// rotate(arr,1);



//Contains Duplicate
// Given an array of integers, find if the array contains any duplicates.
// Your function should return true if any value appears at least twice in the array, 
// and it should return false if every element is distinct.

// function checkDuplicates(nums){
//     let count = 0;
//     let check = []; 
//     let res = false;

//     while (count < nums.length) {
//         if( check.indexOf(nums[count]) === -1){
//             check.push(nums[count])
//             count++
//         }else {
//             res = true;
//             break;
//         }
//     }

//     return res;

// }

// console.log(checkDuplicates([1,2,3,2]))



// Single Number
// Given an array of integers, every element appears twice except for one. Find that single one.

// Note:
// Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

function findSingle(nums){
    let single;
    
    for(let i = 0; i < nums.length; i++){
        let check = nums[i];
        nums.splice(i, 1);

        let index = nums.indexOf(check);
        if (  index === -1){
            single = check
        } else {
            nums.splice(index, 1);
        }

        i--

    }

    return single;
}

console.log(findSingle([2,2,3,3]))

