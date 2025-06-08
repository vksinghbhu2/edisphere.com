 @if "%SCM_TRACE_LEVEL%" NEQ "4" @echo off

    REM Put Ruby in Path
    REM You can also use %TEMP% but it is cleared on site restart. Tools is persistent.
    SET PATH=%PATH%;D:\home\site\deployments\tools\r\rubyinstaller-2.7.2-1-x64\bin

    REM I am in the repository folder
    pushd D:\home\site\deployments
    if not exist tools md tools
    cd tools
    if not exist r md r
    cd r
    if exist rubyinstaller-2.7.2-1-x64 goto end

    echo No Ruby, need to get it!

    REM Get Ruby and Rails
    REM 64bit
    curl -o rubyinstaller-2.7.2-1-x64.zip -L https://github.com/oneclick/rubyinstaller2/releases/download/RubyInstaller-2.7.2-1/rubyinstaller-2.7.2-1-x64.7z
    REM Azure puts 7zip here!
    echo START Unzipping Ruby
    SetLocal DisableDelayedExpansion & d:\7zip\7za x -xr!*.ri -y rubyinstaller-2.7.2-1-x64.zip > rubyout
    echo DONE Unzipping Ruby

    REM Get DevKit to build Ruby native gems
    REM If you don't need DevKit, rem this out.
    REM curl -o DevKit.zip http://cdn.rubyinstaller.org/archives/devkits/DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe
    REM echo START Unzipping DevKit
    REM d:\7zip\7za x -y -oDevKit DevKit.zip > devkitout
    REM echo DONE Unzipping DevKit

    REM Init DevKit
    REM ruby DevKit\dk.rb init

    REM Tell DevKit where Ruby is
    REM echo --- > config.yml
    REM echo - D:/home/site/deployments/tools/r/ruby-2.7.2-1-x64 >> config.yml

    REM Setup DevKit
    REM ruby DevKit\dk.rb install

    REM Update Gem223 until someone fixes the Ruby Windows installer https://github.com/oneclick/rubyinstaller/issues/261
    REM curl -L -o update.gem https://rubygems.org/gems/rubygems-update-2.6.8.gem
    call gem install rubygems-update
    call update_rubygems
    call gem update --system
    REM call gem install --local update.gem
    REM call update_rubygems --no-ri --no-rdoc > updaterubygemsout
    ECHO What's our new Rubygems version?
    call gem --version
    REM call gem uninstall rubygems-update -x

    popd

    :end

    REM Need to be in Reposistory
    cd %DEPLOYMENT_SOURCE%
    cd

    call gem install bundler

    ECHO Bundler install (not update!)
    call bundle install

    cd %DEPLOYMENT_SOURCE%
    cd

    ECHO Running Jekyll
    call bundle exec jekyll build

    REM KuduSync is after this!