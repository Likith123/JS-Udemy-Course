const ATTACK_VALUE = 10;
const MONSTER_ATTACK_VALUE = 14;
const STRONG_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;
let hasBonusLife = true;
let battleLog = [];
const EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const EVENT_HEAL = "HEAL";
const EVENT_GAME_OVER = "GAME_OVER";

function getMaxLifeValues() {
  let enteredValue = parseInt(
    prompt("Enter maximum life for you and the monster.")
  );
  if (isNaN(enteredValue) || enteredValue <= 0) {
    throw { meassage: "Invalid user input, not a number!" };
  }
  return enteredValue;
}

let chosenMaxLife;
try {
  chosenMaxLife = getMaxLifeValues();
} catch (err) {
  console.log(err);
  chosenMaxLife = 100;
}
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealthBar, playerHealth) {
  let logEntry = {
    event: event,
    value: value,
    finalMonsterHealth: monsterHealthBar,
    finalPlayerHealth: playerHealth,
  };
  if (event === EVENT_PLAYER_ATTACK || event === EVENT_PLAYER_STRONG_ATTACK) {
    logEntry.target = "MONSTER";
  } else if (event === EVENT_MONSTER_ATTACK || event === EVENT_HEAL) {
    logEntry.target = "PLAYER";
  }
  battleLog.push(logEntry);
}

function reset() {
  currentMonsterHealth = currentPlayerHealth = chosenMaxLife;
  resetGame(chosenMaxLife);
}

function conditionHandler() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert("You would be dead but the bonus life saved you!");
  }
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You win !!!");
    writeToLog(
      EVENT_GAME_OVER,
      "Player Won!!!",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost !!!");
    EVENT_GAME_OVER,
      "Monster Won!!!",
      currentMonsterHealth,
      currentPlayerHealth;
  } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
    alert("You have a draw !!!");
    EVENT_GAME_OVER, "A Draw!!!", currentMonsterHealth, currentPlayerHealth;
  }

  if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
    reset();
  }
}

function damageHandler(damageValue) {
  const damage = dealMonsterDamage(damageValue);
  currentMonsterHealth -= damage;
  let logEvent;
  if (damageValue === ATTACK_VALUE) {
    logEvent = EVENT_PLAYER_ATTACK;
  } else if (damageValue === STRONG_ATTACK_VALUE) {
    logEvent = EVENT_PLAYER_STRONG_ATTACK;
  }
  writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
  conditionHandler();
}

function attackHandler() {
  damageHandler(ATTACK_VALUE);
  logEvent = EVENT_PLAYER_ATTACK;
}

function strongAttackHandler() {
  damageHandler(STRONG_ATTACK_VALUE);
  logEvent = EVENT_PLAYER_STRONG_ATTACK;
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max health.");
    healValue = chosenMaxLife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(EVENT_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
  conditionHandler();
}

function printLogHandler() {
  let i = 0;
  for (const logEntry of battleLog) {
    console.log(`${i++}`);
    for (const key in logEntry) {
      console.log(`${key} : ${logEntry[key]}`);
    }
  }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
