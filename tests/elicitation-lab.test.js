import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("Elicitation Lab Tests", () => {
  it("should validate an elicitation response and update the queue", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({
      url: "https://arthrod--a1dde74ed98711f1b86b1607ee4eb77e.web.val.run/",
    });

    const initialAssert = await testdriver.assert(
      "the Elicitation Lab page is visible with the elicitation queue showing 0 / 3 answered"
    );
    expect(initialAssert).toBeTruthy();

    const labLink = await testdriver.find("the Lab link in the top navigation bar");
    await labLink.click();

    await testdriver.pressKeys([
      "ArrowDown", "ArrowDown", "ArrowDown", "ArrowDown",
      "ArrowDown", "ArrowDown", "ArrowDown", "ArrowDown"
    ]);

    const stagingBtn = await testdriver.find("the Staging option button");
    await stagingBtn.click();

    const noMigrationsBtn = await testdriver.find("the No option button under Run migrations first");
    await noMigrationsBtn.click();

    const readyAssert = await testdriver.assert("the payload preview shows Ready for server validation");
    expect(readyAssert).toBeTruthy();

    const validateBtn = await testdriver.find("the Validate response button with right arrow");
    await validateBtn.click();

    const acceptedAssert = await testdriver.assert(
      "the Confirm deployment target plan shows Accepted in the queue"
    );
    expect(acceptedAssert).toBeTruthy();

    const declineBtn = await testdriver.find("the Decline button under Response action");
    await declineBtn.click();

    const declineAssert = await testdriver.assert(
      "the payload preview shows action decline and Ready for server validation"
    );
    expect(declineAssert).toBeTruthy();

    const validateDeclineBtn = await testdriver.find("the Validate response button with right arrow");
    await validateDeclineBtn.click();

    const declinedAssert = await testdriver.assert(
      "Matter intake details shows a Declined badge in the queue"
    );
    expect(declinedAssert).toBeTruthy();

    const firstPlanItem = await testdriver.find("the Confirm deployment target item in the queue");
    await firstPlanItem.click();

    const resetDraftBtn = await testdriver.find("the Reset draft button");
    await resetDraftBtn.click();

    const resetAssert = await testdriver.assert(
      "Confirm deployment target shows a Pending badge in the queue"
    );
    expect(resetAssert).toBeTruthy();
  });
});
