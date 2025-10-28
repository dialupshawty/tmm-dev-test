  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
          function onScheduleRoot(root2, children) {
                  injectedHook.onScheduleFiberRoot(rendererID, root2, children);
          function onCommitRoot(root2, eventPriority) {
                var didError = (root2.current.flags & DidCapture) === DidCapture;
                  injectedHook.onCommitFiberRoot(rendererID, root2, schedulerPriority, didError);
                  injectedHook.onCommitFiberRoot(rendererID, root2, void 0, didError);
          function onPostCommitRoot(root2) {
                injectedHook.onPostCommitFiberRoot(rendererID, root2);
          function getNextLanes(root2, wipLanes) {
            var pendingLanes = root2.pendingLanes;
            var suspendedLanes = root2.suspendedLanes;
            var pingedLanes = root2.pingedLanes;
            var entangledLanes = root2.entangledLanes;
              var entanglements = root2.entanglements;
          function getMostRecentEventTime(root2, lanes) {
            var eventTimes = root2.eventTimes;
          function markStarvedLanesAsExpired(root2, currentTime) {
            var pendingLanes = root2.pendingLanes;
            var suspendedLanes = root2.suspendedLanes;
            var pingedLanes = root2.pingedLanes;
            var expirationTimes = root2.expirationTimes;
                root2.expiredLanes |= lane;
          function getHighestPriorityPendingLanes(root2) {
            return getHighestPriorityLanes(root2.pendingLanes);
          function getLanesToRetrySynchronouslyOnError(root2) {
            var everythingButOffscreen = root2.pendingLanes & ~OffscreenLane;
          function includesBlockingLane(root2, lanes) {
          function includesExpiredLane(root2, lanes) {
            return (lanes & root2.expiredLanes) !== NoLanes;
          function markRootUpdated(root2, updateLane, eventTime) {
            root2.pendingLanes |= updateLane;
              root2.suspendedLanes = NoLanes;
              root2.pingedLanes = NoLanes;
            var eventTimes = root2.eventTimes;
          function markRootSuspended(root2, suspendedLanes) {
            root2.suspendedLanes |= suspendedLanes;
            root2.pingedLanes &= ~suspendedLanes;
            var expirationTimes = root2.expirationTimes;
          function markRootPinged(root2, pingedLanes, eventTime) {
            root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
          }
          function markRootFinished(root2, remainingLanes) {
            var noLongerPendingLanes = root2.pendingLanes & ~remainingLanes;
            root2.pendingLanes = remainingLanes;
            root2.suspendedLanes = NoLanes;
            root2.pingedLanes = NoLanes;
            root2.expiredLanes &= remainingLanes;
            root2.mutableReadLanes &= remainingLanes;
            root2.entangledLanes &= remainingLanes;
            var entanglements = root2.entanglements;
            var eventTimes = root2.eventTimes;
            var expirationTimes = root2.expirationTimes;
          function markRootEntangled(root2, entangledLanes) {
            var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
            var entanglements = root2.entanglements;
          function getBumpedLaneForHydration(root2, renderLanes2) {
            if ((lane & (root2.suspendedLanes | renderLanes2)) !== NoLane) {
          function addFiberToLanesMap(root2, fiber, lanes) {
            var pendingUpdatersLaneMap = root2.pendingUpdatersLaneMap;
          function movePendingFibersToMemoized(root2, lanes) {
            var pendingUpdatersLaneMap = root2.pendingUpdatersLaneMap;
            var memoizedUpdaters = root2.memoizedUpdaters;
          function getTransitionsForLanes(root2, lanes) {
          function isRootDehydrated(root2) {
            var currentState = root2.current.memoizedState;
                  var root2 = nearestMounted.stateNode;
                  if (isRootDehydrated(root2)) {
          function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
              dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
          function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
              dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
                  var root2 = nearestMounted.stateNode;
                  if (isRootDehydrated(root2)) {
          var root = null;
            root = nativeEventTarget;
            root = null;
            if ("value" in root) {
              return root.value;
            return root.textContent;
          function getNodeForCharacterOffset(root2, offset) {
            var node = getLeafNode(root2);
                    var container = node.stateNode.containerInfo;
                    if (isMatchingRootContainer(container, targetContainerNode)) {
                    while (container !== null) {
                      var parentNode = getClosestInstanceFromNode(container);
                      container = container.parentNode;
                var root2 = rootContainerInstance.documentElement;
                namespace = root2 ? root2.namespaceURI : getChildNamespace(null, "");
                var container = nodeType === COMMENT_NODE ? rootContainerInstance.parentNode : rootContainerInstance;
                var ownNamespace = container.namespaceURI || null;
                type = container.tagName;
          function appendChildToContainer(container, child) {
            if (container.nodeType === COMMENT_NODE) {
              parentNode = container.parentNode;
              parentNode.insertBefore(child, container);
              parentNode = container;
            var reactRootContainer = container._reactRootContainer;
          function insertInContainerBefore(container, child, beforeChild) {
            if (container.nodeType === COMMENT_NODE) {
              container.parentNode.insertBefore(child, beforeChild);
              container.insertBefore(child, beforeChild);
          function removeChildFromContainer(container, child) {
            if (container.nodeType === COMMENT_NODE) {
              container.parentNode.removeChild(child);
              container.removeChild(child);
          function clearSuspenseBoundaryFromContainer(container, suspenseInstance) {
            if (container.nodeType === COMMENT_NODE) {
              clearSuspenseBoundary(container.parentNode, suspenseInstance);
            } else if (container.nodeType === ELEMENT_NODE) {
              clearSuspenseBoundary(container, suspenseInstance);
            retryIfBlockedOn(container);
          function clearContainer(container) {
            if (container.nodeType === ELEMENT_NODE) {
              container.textContent = "";
            } else if (container.nodeType === DOCUMENT_NODE) {
              if (container.documentElement) {
                container.removeChild(container.documentElement);
          function commitHydratedContainer(container) {
            retryIfBlockedOn(container);
              var root2 = node.stateNode;
              return root2;
          function entangleTransitions(root2, fiber, lane) {
              queueLanes = intersectLanes(queueLanes, root2.pendingLanes);
              markRootEntangled(root2, newQueueLanes);
          function registerMutableSourceForHydration(root2, mutableSource) {
            if (root2.mutableSourceEagerHydrationData == null) {
              root2.mutableSourceEagerHydrationData = [mutableSource, version];
              root2.mutableSourceEagerHydrationData.push(mutableSource, version);
              var root2 = getWorkInProgressRoot();
              if (root2 === null) {
              if (!includesBlockingLane(root2, renderLanes)) {
              var root2 = getWorkInProgressRoot();
              if (root2 === null) {
              if (!includesBlockingLane(root2, renderLanes)) {
            var root2 = enqueueConcurrentRenderForLane(fiber, SyncLane);
            if (root2 !== null) {
              scheduleUpdateOnFiber(root2, fiber, SyncLane, NoTimestamp);
            var root2 = getWorkInProgressRoot();
            var identifierPrefix = root2.identifierPrefix;
              var root2 = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
              if (root2 !== null) {
                scheduleUpdateOnFiber(root2, fiber, lane, eventTime);
                entangleTransitionUpdate(root2, queue, lane);
              var root2 = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
              if (root2 !== null) {
                scheduleUpdateOnFiber(root2, fiber, lane, eventTime);
                entangleTransitionUpdate(root2, queue, lane);
          function entangleTransitionUpdate(root2, queue, lane) {
              queueLanes = intersectLanes(queueLanes, root2.pendingLanes);
              markRootEntangled(root2, newQueueLanes);
                    var root2 = parentFiber.stateNode;
                    root2.effectDuration += elapsedTime;
                    var root2 = parentFiber.stateNode;
                    if (root2 !== null) {
                      root2.passiveEffectDuration += elapsedTime;
              var root2 = enqueueUpdate(fiber, update, lane);
              if (root2 !== null) {
                scheduleUpdateOnFiber(root2, fiber, lane, eventTime);
                entangleTransitions(root2, fiber, lane);
              var root2 = enqueueUpdate(fiber, update, lane);
              if (root2 !== null) {
                scheduleUpdateOnFiber(root2, fiber, lane, eventTime);
                entangleTransitions(root2, fiber, lane);
              var root2 = enqueueUpdate(fiber, update, lane);
              if (root2 !== null) {
                scheduleUpdateOnFiber(root2, fiber, lane, eventTime);
                entangleTransitions(root2, fiber, lane);
          function attachPingListener(root2, wakeable, lanes) {
            var pingCache = root2.pingCache;
              pingCache = root2.pingCache = new PossiblyWeakMap$1();
              var ping = pingSuspendedRoot.bind(null, root2, wakeable, lanes);
                  restorePendingUpdaters(root2, lanes);
          function attachRetryListener(suspenseBoundary, root2, wakeable, lanes) {
          function markSuspenseBoundaryShouldCapture(suspenseBoundary, returnFiber, sourceFiber, root2, rootRenderLanes) {
          function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
                restorePendingUpdaters(root2, rootRenderLanes);
                markSuspenseBoundaryShouldCapture(suspenseBoundary, returnFiber, sourceFiber, root2, rootRenderLanes);
                  attachPingListener(root2, wakeable, rootRenderLanes);
                attachRetryListener(suspenseBoundary, root2, wakeable);
                  attachPingListener(root2, wakeable, rootRenderLanes);
                  markSuspenseBoundaryShouldCapture(_suspenseBoundary, returnFiber, sourceFiber, root2, rootRenderLanes);
            var root2 = workInProgress2.stateNode;
            if (root2.pendingContext) {
              pushTopLevelContextObject(workInProgress2, root2.pendingContext, root2.pendingContext !== root2.context);
            } else if (root2.context) {
              pushTopLevelContextObject(workInProgress2, root2.context, false);
            pushHostContainer(workInProgress2, root2.containerInfo);
            var root2 = workInProgress2.stateNode;
                var root2 = getWorkInProgressRoot();
                if (root2 !== null) {
                  var attemptHydrationAtLane = getBumpedLaneForHydration(root2, renderLanes2);
                    scheduleUpdateOnFiber(root2, current2, attemptHydrationAtLane, eventTime);
                var root2 = workInProgress2.stateNode;
                var root2 = workInProgress2.stateNode;
                var root2 = interruptedWork.stateNode;
          function commitBeforeMutationEffects(root2, firstChild) {
            focusedInstanceHandle = prepareForCommit(root2.containerInfo);
                    var root2 = finishedWork.stateNode;
                    clearContainer(root2.containerInfo);
                          var root2 = parentFiber.stateNode;
                          root2.passiveEffectDuration += passiveEffectDuration;
                            var root2 = parentFiber.stateNode;
                            root2.effectDuration += effectDuration;
          function commitDeletionEffects(root2, returnFiber, deletedFiber) {
              commitDeletionEffectsOnFiber(root2, returnFiber, deletedFiber);
          function commitMutationEffects(root2, finishedWork, committedLanes) {
            inProgressRoot = root2;
            commitMutationEffectsOnFiber(finishedWork, root2);
          function recursivelyTraverseMutationEffects(root2, parentFiber, lanes) {
                  commitDeletionEffects(root2, parentFiber, childToDelete);
                commitMutationEffectsOnFiber(child, root2);
          function commitMutationEffectsOnFiber(finishedWork, root2, lanes) {
                recursivelyTraverseMutationEffects(root2, finishedWork);
                recursivelyTraverseMutationEffects(root2, finishedWork);
                recursivelyTraverseMutationEffects(root2, finishedWork);
                recursivelyTraverseMutationEffects(root2, finishedWork);
                recursivelyTraverseMutationEffects(root2, finishedWork);
                          commitHydratedContainer(root2.containerInfo);
                recursivelyTraverseMutationEffects(root2, finishedWork);
                recursivelyTraverseMutationEffects(root2, finishedWork);
                  recursivelyTraverseMutationEffects(root2, finishedWork);
                  recursivelyTraverseMutationEffects(root2, finishedWork);
                recursivelyTraverseMutationEffects(root2, finishedWork);
                recursivelyTraverseMutationEffects(root2, finishedWork);
          function commitLayoutEffects(finishedWork, root2, committedLanes) {
            inProgressRoot = root2;
            commitLayoutEffects_begin(finishedWork, root2, committedLanes);
          function commitLayoutEffects_begin(subtreeRoot, root2, committedLanes) {
                  commitLayoutMountEffects_complete(subtreeRoot, root2, committedLanes);
                      root2,
                  commitLayoutMountEffects_complete(subtreeRoot, root2, committedLanes);
                commitLayoutMountEffects_complete(subtreeRoot, root2, committedLanes);
          function commitLayoutMountEffects_complete(subtreeRoot, root2, committedLanes) {
                  commitLayoutEffectOnFiber(root2, current2, fiber, committedLanes);
          function commitPassiveMountEffects(root2, finishedWork, committedLanes, committedTransitions) {
            commitPassiveMountEffects_begin(finishedWork, root2, committedLanes, committedTransitions);
          function commitPassiveMountEffects_begin(subtreeRoot, root2, committedLanes, committedTransitions) {
                commitPassiveMountEffects_complete(subtreeRoot, root2, committedLanes, committedTransitions);
          function commitPassiveMountEffects_complete(subtreeRoot, root2, committedLanes, committedTransitions) {
                  commitPassiveMountOnFiber(root2, fiber, committedLanes, committedTransitions);
          function scheduleUpdateOnFiber(root2, fiber, lane, eventTime) {
            markRootUpdated(root2, lane, eventTime);
            if ((executionContext & RenderContext) !== NoLanes && root2 === workInProgressRoot) {
                  addFiberToLanesMap(root2, fiber, lane);
              if (root2 === workInProgressRoot) {
                  markRootSuspended$1(root2, workInProgressRootRenderLanes);
              ensureRootIsScheduled(root2, eventTime);
          function scheduleInitialHydrationOnRoot(root2, lane, eventTime) {
            var current2 = root2.current;
            markRootUpdated(root2, lane, eventTime);
            ensureRootIsScheduled(root2, eventTime);
          function ensureRootIsScheduled(root2, currentTime) {
            var existingCallbackNode = root2.callbackNode;
            markStarvedLanesAsExpired(root2, currentTime);
            var nextLanes = getNextLanes(root2, root2 === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes);
              root2.callbackNode = null;
              root2.callbackPriority = NoLane;
            var existingCallbackPriority = root2.callbackPriority;
              if (root2.tag === LegacyRoot) {
                scheduleLegacySyncCallback(performSyncWorkOnRoot.bind(null, root2));
                scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root2));
              newCallbackNode = scheduleCallback$1(schedulerPriorityLevel, performConcurrentWorkOnRoot.bind(null, root2));
            root2.callbackPriority = newCallbackPriority;
            root2.callbackNode = newCallbackNode;
          function performConcurrentWorkOnRoot(root2, didTimeout) {
            var originalCallbackNode = root2.callbackNode;
              if (root2.callbackNode !== originalCallbackNode) {
            var lanes = getNextLanes(root2, root2 === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes);
            var shouldTimeSlice = !includesBlockingLane(root2, lanes) && !includesExpiredLane(root2, lanes) && !didTimeout;
            var exitStatus = shouldTimeSlice ? renderRootConcurrent(root2, lanes) : renderRootSync(root2, lanes);
                var errorRetryLanes = getLanesToRetrySynchronouslyOnError(root2);
                  exitStatus = recoverFromConcurrentError(root2, errorRetryLanes);
                prepareFreshStack(root2, NoLanes);
                markRootSuspended$1(root2, lanes);
                ensureRootIsScheduled(root2, now());
                markRootSuspended$1(root2, lanes);
                var renderWasConcurrent = !includesBlockingLane(root2, lanes);
                var finishedWork = root2.current.alternate;
                  exitStatus = renderRootSync(root2, lanes);
                    var _errorRetryLanes = getLanesToRetrySynchronouslyOnError(root2);
                      exitStatus = recoverFromConcurrentError(root2, _errorRetryLanes);
                    prepareFreshStack(root2, NoLanes);
                    markRootSuspended$1(root2, lanes);
                    ensureRootIsScheduled(root2, now());
                root2.finishedWork = finishedWork;
                root2.finishedLanes = lanes;
                finishConcurrentRender(root2, exitStatus, lanes);
            ensureRootIsScheduled(root2, now());
            if (root2.callbackNode === originalCallbackNode) {
              return performConcurrentWorkOnRoot.bind(null, root2);
          function recoverFromConcurrentError(root2, errorRetryLanes) {
            if (isRootDehydrated(root2)) {
              var rootWorkInProgress = prepareFreshStack(root2, errorRetryLanes);
                errorHydratingContainer(root2.containerInfo);
            var exitStatus = renderRootSync(root2, errorRetryLanes);
          function finishConcurrentRender(root2, exitStatus, lanes) {
                commitRoot(root2, workInProgressRootRecoverableErrors, workInProgressTransitions);
                markRootSuspended$1(root2, lanes);
                    var nextLanes = getNextLanes(root2, NoLanes);
                    var suspendedLanes = root2.suspendedLanes;
                      markRootPinged(root2, suspendedLanes);
                    root2.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root2, workInProgressRootRecoverableErrors, workInProgressTransitions), msUntilTimeout);
                commitRoot(root2, workInProgressRootRecoverableErrors, workInProgressTransitions);
                markRootSuspended$1(root2, lanes);
                  var mostRecentEventTime = getMostRecentEventTime(root2, lanes);
                    root2.timeoutHandle = scheduleTimeout(commitRoot.bind(null, root2, workInProgressRootRecoverableErrors, workInProgressTransitions), _msUntilTimeout);
                commitRoot(root2, workInProgressRootRecoverableErrors, workInProgressTransitions);
                commitRoot(root2, workInProgressRootRecoverableErrors, workInProgressTransitions);
          function markRootSuspended$1(root2, suspendedLanes) {
            markRootSuspended(root2, suspendedLanes);
          function performSyncWorkOnRoot(root2) {
            var lanes = getNextLanes(root2, NoLanes);
              ensureRootIsScheduled(root2, now());
            var exitStatus = renderRootSync(root2, lanes);
            if (root2.tag !== LegacyRoot && exitStatus === RootErrored) {
              var errorRetryLanes = getLanesToRetrySynchronouslyOnError(root2);
                exitStatus = recoverFromConcurrentError(root2, errorRetryLanes);
              prepareFreshStack(root2, NoLanes);
              markRootSuspended$1(root2, lanes);
              ensureRootIsScheduled(root2, now());
            var finishedWork = root2.current.alternate;
            root2.finishedWork = finishedWork;
            root2.finishedLanes = lanes;
            commitRoot(root2, workInProgressRootRecoverableErrors, workInProgressTransitions);
            ensureRootIsScheduled(root2, now());
          function flushRoot(root2, lanes) {
              markRootEntangled(root2, mergeLanes(lanes, SyncLane));
              ensureRootIsScheduled(root2, now());
          function prepareFreshStack(root2, lanes) {
            root2.finishedWork = null;
            root2.finishedLanes = NoLanes;
            var timeoutHandle = root2.timeoutHandle;
              root2.timeoutHandle = noTimeout;
            workInProgressRoot = root2;
            var rootWorkInProgress = createWorkInProgress(root2.current, null);
          function handleError(root2, thrownValue) {
                throwException(root2, erroredWork.return, erroredWork, thrownValue, workInProgressRootRenderLanes);
          function renderRootSync(root2, lanes) {
            if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes) {
                  var memoizedUpdaters = root2.memoizedUpdaters;
                    restorePendingUpdaters(root2, workInProgressRootRenderLanes);
                  movePendingFibersToMemoized(root2, lanes);
              prepareFreshStack(root2, lanes);
                handleError(root2, thrownValue);
          function renderRootConcurrent(root2, lanes) {
            if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes) {
                  var memoizedUpdaters = root2.memoizedUpdaters;
                    restorePendingUpdaters(root2, workInProgressRootRenderLanes);
                  movePendingFibersToMemoized(root2, lanes);
              prepareFreshStack(root2, lanes);
                handleError(root2, thrownValue);
          function commitRoot(root2, recoverableErrors, transitions) {
              commitRootImpl(root2, recoverableErrors, transitions, previousUpdateLanePriority);
          function commitRootImpl(root2, recoverableErrors, transitions, renderPriorityLevel) {
            var finishedWork = root2.finishedWork;
            var lanes = root2.finishedLanes;
            root2.finishedWork = null;
            root2.finishedLanes = NoLanes;
            if (finishedWork === root2.current) {
            root2.callbackNode = null;
            root2.callbackPriority = NoLane;
            markRootFinished(root2, remainingLanes);
            if (root2 === workInProgressRoot) {
              var shouldFireAfterActiveInstanceBlur2 = commitBeforeMutationEffects(root2, finishedWork);
              commitMutationEffects(root2, finishedWork, lanes);
              resetAfterCommit(root2.containerInfo);
              root2.current = finishedWork;
              commitLayoutEffects(finishedWork, root2, lanes);
              root2.current = finishedWork;
              rootWithPendingPassiveEffects = root2;
            remainingLanes = root2.pendingLanes;
                commitDoubleInvokeEffectsInDEV(root2.current, false);
                root2.memoizedUpdaters.clear();
            ensureRootIsScheduled(root2, now());
              var onRecoverableError = root2.onRecoverableError;
            if (includesSomeLane(pendingPassiveEffectsLanes, SyncLane) && root2.tag !== LegacyRoot) {
            remainingLanes = root2.pendingLanes;
              if (root2 === rootWithNestedUpdates) {
                rootWithNestedUpdates = root2;
            var root2 = rootWithPendingPassiveEffects;
            commitPassiveUnmountEffects(root2.current);
            commitPassiveMountEffects(root2, root2.current, lanes, transitions);
                commitPassiveEffectDurations(root2, _fiber);
              commitDoubleInvokeEffectsInDEV(root2.current, true);
                if (root2 === rootWithPassiveNestedUpdates) {
                  rootWithPassiveNestedUpdates = root2;
            onPostCommitRoot(root2);
              var stateNode = root2.current.stateNode;
            var root2 = enqueueUpdate(rootFiber, update, SyncLane);
            if (root2 !== null) {
              markRootUpdated(root2, SyncLane, eventTime);
              ensureRootIsScheduled(root2, eventTime);
                  var root2 = enqueueUpdate(fiber, update, SyncLane);
                  if (root2 !== null) {
                    markRootUpdated(root2, SyncLane, eventTime);
                    ensureRootIsScheduled(root2, eventTime);
          function pingSuspendedRoot(root2, wakeable, pingedLanes) {
            var pingCache = root2.pingCache;
            markRootPinged(root2, pingedLanes);
            warnIfSuspenseResolutionNotWrappedWithActDEV(root2);
            if (workInProgressRoot === root2 && isSubsetOfLanes(workInProgressRootRenderLanes, pingedLanes)) {
                prepareFreshStack(root2, NoLanes);
            ensureRootIsScheduled(root2, eventTime);
            var root2 = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
            if (root2 !== null) {
              markRootUpdated(root2, retryLane, eventTime);
              ensureRootIsScheduled(root2, eventTime);
          function restorePendingUpdaters(root2, lanes) {
                var memoizedUpdaters = root2.memoizedUpdaters;
                  addFiberToLanesMap(root2, schedulingFiber, lanes);
          function warnIfSuspenseResolutionNotWrappedWithActDEV(root2) {
              if (root2.tag !== LegacyRoot && isConcurrentActEnvironment() && ReactCurrentActQueue$1.current === null) {
          var scheduleRefresh = function(root2, update) {
                scheduleFibersWithFamiliesRecursively(root2.current, updatedFamilies, staleFamilies);
          var scheduleRoot = function(root2, element) {
              if (root2.context !== emptyContextObject) {
                updateContainer(element, root2, null, null);
          var findHostInstancesForRefresh = function(root2, families) {
              findHostInstancesForMatchingFibersRecursively(root2.current, types, hostInstances);
            var root2 = new FiberRootNode(containerInfo, tag, hydrate2, identifierPrefix, onRecoverableError);
            root2.current = uninitializedFiber;
            uninitializedFiber.stateNode = root2;
            return root2;
            var root2 = createFiberRoot(containerInfo, tag, hydrate2, initialChildren, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError);
            root2.context = getContextForSubtree(null);
            var current2 = root2.current;
            scheduleInitialHydrationOnRoot(root2, lane, eventTime);
            return root2;
          function updateContainer(element, container, parentComponent, callback) {
              onScheduleRoot(container, element);
            var current$1 = container.current;
            if (container.context === null) {
              container.context = context;
              container.pendingContext = context;
            var root2 = enqueueUpdate(current$1, update, lane);
            if (root2 !== null) {
              scheduleUpdateOnFiber(root2, current$1, lane, eventTime);
              entangleTransitions(root2, current$1, lane);
          function getPublicRootInstance(container) {
            var containerFiber = container.current;
                var root2 = fiber.stateNode;
                if (isRootDehydrated(root2)) {
                  var lanes = getHighestPriorityPendingLanes(root2);
                  flushRoot(root2, lanes);
                  var root3 = enqueueConcurrentRenderForLane(fiber, SyncLane);
                  if (root3 !== null) {
                    scheduleUpdateOnFiber(root3, fiber, SyncLane, eventTime);
            var root2 = enqueueConcurrentRenderForLane(fiber, lane);
            if (root2 !== null) {
              scheduleUpdateOnFiber(root2, fiber, lane, eventTime);
            var root2 = enqueueConcurrentRenderForLane(fiber, lane);
            if (root2 !== null) {
              scheduleUpdateOnFiber(root2, fiber, lane, eventTime);
                var root2 = enqueueConcurrentRenderForLane(fiber, SyncLane);
                if (root2 !== null) {
                  scheduleUpdateOnFiber(root2, fiber, SyncLane, NoTimestamp);
                var root2 = enqueueConcurrentRenderForLane(fiber, SyncLane);
                if (root2 !== null) {
                  scheduleUpdateOnFiber(root2, fiber, SyncLane, NoTimestamp);
                var root2 = enqueueConcurrentRenderForLane(fiber, SyncLane);
                if (root2 !== null) {
                  scheduleUpdateOnFiber(root2, fiber, SyncLane, NoTimestamp);
              var root2 = enqueueConcurrentRenderForLane(fiber, SyncLane);
              if (root2 !== null) {
                scheduleUpdateOnFiber(root2, fiber, SyncLane, NoTimestamp);
              var root2 = enqueueConcurrentRenderForLane(fiber, SyncLane);
              if (root2 !== null) {
                scheduleUpdateOnFiber(root2, fiber, SyncLane, NoTimestamp);
              var root2 = enqueueConcurrentRenderForLane(fiber, SyncLane);
              if (root2 !== null) {
                scheduleUpdateOnFiber(root2, fiber, SyncLane, NoTimestamp);
              var root2 = enqueueConcurrentRenderForLane(fiber, SyncLane);
              if (root2 !== null) {
                scheduleUpdateOnFiber(root2, fiber, SyncLane, NoTimestamp);
            var root2 = this._internalRoot;
            if (root2 === null) {
              var container = root2.containerInfo;
              if (container.nodeType !== COMMENT_NODE) {
                var hostInstance = findHostInstanceWithNoPortals(root2.current);
                  if (hostInstance.parentNode !== container) {
            updateContainer(children, root2, null, null);
            var root2 = this._internalRoot;
            if (root2 !== null) {
              var container = root2.containerInfo;
                updateContainer(null, root2, null, null);
              unmarkContainerAsRoot(container);
          function createRoot(container, options2) {
            if (!isValidContainer(container)) {
            warnIfReactDOMContainerInDEV(container);
            var root2 = createContainer(container, ConcurrentRoot, null, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError);
            markContainerAsRoot(root2.current, container);
            var rootContainerElement = container.nodeType === COMMENT_NODE ? container.parentNode : container;
            return new ReactDOMRoot(root2);
          function hydrateRoot(container, initialChildren, options2) {
            if (!isValidContainer(container)) {
            warnIfReactDOMContainerInDEV(container);
            var root2 = createHydrationContainer(initialChildren, null, container, ConcurrentRoot, hydrationCallbacks, isStrictMode, concurrentUpdatesByDefaultOverride, identifierPrefix, onRecoverableError);
            markContainerAsRoot(root2.current, container);
            listenToAllSupportedEvents(container);
                registerMutableSourceForHydration(root2, mutableSource);
            return new ReactDOMHydrationRoot(root2);
          function warnIfReactDOMContainerInDEV(container) {
              if (container.nodeType === ELEMENT_NODE && container.tagName && container.tagName.toUpperCase() === "BODY") {
              if (isContainerMarkedAsRoot(container)) {
                if (container._reactRootContainer) {
            topLevelUpdateWarnings = function(container) {
              if (container._reactRootContainer && container.nodeType !== COMMENT_NODE) {
                var hostInstance = findHostInstanceWithNoPortals(container._reactRootContainer.current);
                  if (hostInstance.parentNode !== container) {
              var isRootRenderedBySomeReact = !!container._reactRootContainer;
              var rootEl = getReactRootElementInContainer(container);
              if (container.nodeType === ELEMENT_NODE && container.tagName && container.tagName.toUpperCase() === "BODY") {
          function getReactRootElementInContainer(container) {
            if (!container) {
            if (container.nodeType === DOCUMENT_NODE) {
              return container.documentElement;
              return container.firstChild;
          function legacyCreateRootFromDOMContainer(container, initialChildren, parentComponent, callback, isHydrationContainer) {
                  var instance = getPublicRootInstance(root2);
              var root2 = createHydrationContainer(
                container,
              container._reactRootContainer = root2;
              markContainerAsRoot(root2.current, container);
              var rootContainerElement = container.nodeType === COMMENT_NODE ? container.parentNode : container;
              return root2;
              while (rootSibling = container.lastChild) {
                container.removeChild(rootSibling);
                container,
              container._reactRootContainer = _root;
              markContainerAsRoot(_root.current, container);
              var _rootContainerElement = container.nodeType === COMMENT_NODE ? container.parentNode : container;
          function legacyRenderSubtreeIntoContainer(parentComponent, children, container, forceHydrate, callback) {
              topLevelUpdateWarnings(container);
            var maybeRoot = container._reactRootContainer;
            var root2;
              root2 = legacyCreateRootFromDOMContainer(container, children, parentComponent, callback, forceHydrate);
              root2 = maybeRoot;
                  var instance = getPublicRootInstance(root2);
              updateContainer(children, root2, parentComponent, callback);
            return getPublicRootInstance(root2);
          function hydrate(element, container, callback) {
            if (!isValidContainerLegacy(container)) {
              var isModernRoot = isContainerMarkedAsRoot(container) && container._reactRootContainer === void 0;
            return legacyRenderSubtreeIntoContainer(null, element, container, true, callback);
          function render(element, container, callback) {
            if (!isValidContainerLegacy(container)) {
              var isModernRoot = isContainerMarkedAsRoot(container) && container._reactRootContainer === void 0;
            return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
          function unmountComponentAtNode(container) {
            if (!isValidContainerLegacy(container)) {
              var isModernRoot = isContainerMarkedAsRoot(container) && container._reactRootContainer === void 0;
            if (container._reactRootContainer) {
                var rootEl = getReactRootElementInContainer(container);
                legacyRenderSubtreeIntoContainer(null, null, container, false, function() {
                  container._reactRootContainer = null;
                  unmarkContainerAsRoot(container);
                var _rootEl = getReactRootElementInContainer(container);
                var isContainerReactRoot = container.nodeType === ELEMENT_NODE && isValidContainerLegacy(container.parentNode) && !!container.parentNode._reactRootContainer;
          function createPortal$1(children, container) {
            if (!isValidContainer(container)) {
            return createPortal(children, container, null, key);
          function createRoot$1(container, options2) {
            return createRoot(container, options2);
          function hydrateRoot$1(container, initialChildren, options2) {
            return hydrateRoot(container, initialChildren, options2);
  var import_react, TekkenApp, App_default;
  var init_App = __esm({
    "renderer/src/App.jsx"() {
      import_react = __toESM(require_react());
      TekkenApp = () => {
        const [sitesText, setSitesText] = (0, import_react.useState)("https://example.com/mods.json");
        const [mods, setMods] = (0, import_react.useState)([]);
        const [gamePath, setGamePath] = (0, import_react.useState)("");
        const [loading, setLoading] = (0, import_react.useState)(false);
        const load = async () => {
          setLoading(true);
          const sites = sitesText.split("\n").map((s) => ({ url: s.trim(), type: "auto" })).filter((s) => s.url);
          const res = await window.api.loadMods(sites, { maxPerSite: 200 });
          setMods(Array.isArray(res) ? res.flat ? res.flat() : res : []);
          setLoading(false);
        };
        const chooseGame = async () => {
          const p = await window.api.chooseFolder();
          if (p) setGamePath(p);
        };
        const install = async (mod) => {
          if (!gamePath) {
            alert("Pick game folder first.");
            return;
          }
          const r = await window.api.installMod(mod, gamePath, { createBackup: true });
          if (r.ok) alert("Installed");
          else alert("Err: " + r.error);
        };
        return /* @__PURE__ */ import_react.default.createElement("div", { style: { padding: 20, height: "100vh", boxSizing: "border-box", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ import_react.default.createElement("h2", null, "Tekken Mod Manager"), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("button", { onClick: chooseGame }, "Choose Game Folder"), /* @__PURE__ */ import_react.default.createElement("span", { style: { marginLeft: 10 } }, gamePath)), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginTop: 10 } }, /* @__PURE__ */ import_react.default.createElement("textarea", { value: sitesText, onChange: (e) => setSitesText(e.target.value), rows: 4, style: { width: "100%" } }), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginTop: 6 } }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: load, disabled: loading }, loading ? "Loading..." : "Load Mods"))), /* @__PURE__ */ import_react.default.createElement("div", { style: { marginTop: 20, flex: 1, minHeight: 0, display: "flex", flexDirection: "column" } }, /* @__PURE__ */ import_react.default.createElement("h3", null, "Mods"), /* @__PURE__ */ import_react.default.createElement(
          "div",
          {
            style: {
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              overflowY: "auto",
              paddingRight: 8,
              flex: 1,
              minHeight: 0
            }
          },
          mods.map((m, i) => /* @__PURE__ */ import_react.default.createElement(
            "div",
            {
              key: i,
              style: {
                border: "1px solid #ddd",
                padding: 10,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                minWidth: 0
              }
            },
            /* @__PURE__ */ import_react.default.createElement("img", { src: m.thumbnail || "", alt: "thumb", style: { width: "100%", height: 120, objectFit: "cover" } }),
            /* @__PURE__ */ import_react.default.createElement("h4", { style: { margin: 0, wordBreak: "break-word", overflowWrap: "anywhere" } }, m.title),
            /* @__PURE__ */ import_react.default.createElement("p", { style: { margin: 0, wordBreak: "break-word", overflowWrap: "anywhere", flex: 1 } }, m.desc),
            /* @__PURE__ */ import_react.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 } }, /* @__PURE__ */ import_react.default.createElement("button", { onClick: () => install(m) }, "Install"), /* @__PURE__ */ import_react.default.createElement("a", { href: m.downloadUrl, target: "_blank", rel: "noreferrer" }, "Open"))
          ))
        )));
      };
      App_default = TekkenApp;
    }
  });
  var require_index = __commonJS({
    "renderer/src/index.jsx"() {
      var import_client = __toESM(require_client());
      init_App();
      var container = document.getElementById("root");
      var root = (0, import_client.createRoot)(container);
      root.render(/* @__PURE__ */ React.createElement(App_default, null));
    }
  });
  require_index();
