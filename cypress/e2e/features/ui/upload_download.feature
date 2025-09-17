@UI @UploadDownload
Feature: Upload and Download in Elements

  Background:
    Given I open the demoqa homepage
    And I navigate using menu to "Elements" and then "Upload and Download"

  Scenario: Download a file and upload the same file
    When I download the sample file
    Then I should see the file in downloads folder
    When I upload the downloaded file
    Then I should see the uploaded file name on the page


